import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase.js";
import { firestore } from "../config/firebase.js";
import {
  addDoc,
  collection,
  runTransaction,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { adminStorage } from "../config/firebase.js";
import jwt from "jsonwebtoken";

export const uploadPDF = async (req: any, res: any) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: "No PDF file uploaded" });
    }

    const storageRef = ref(
      storage,
      `pdfs/${new Date()?.toISOString().split(".")[0]?.replace(/:/g, "-")}_${req.file.originalname}`,
    );
    await uploadBytes(storageRef, req.file.buffer, {
      contentType: req.file.mimetype,
    });

    let nextId;
    await runTransaction(firestore, async (transaction) => {
      const counterRef = doc(firestore, "counters", "pdfCounter");
      const counterDoc = await transaction.get(counterRef);

      if (!counterDoc.exists()) {
        nextId = 1;
        transaction.set(counterRef, { count: nextId });
      } else {
        nextId = counterDoc.data().count + 1;
        transaction.update(counterRef, { count: nextId });
      }

      return nextId;
    });

    await addDoc(collection(firestore, "pdfs"), {
      id: nextId,
      fileName: req.file.originalname,
      storagePath: storageRef.fullPath,
      uploadedAt: new Date(),
    });

    return res.status(200).send({
      message: "PDF uploaded successfully",
    });
  } catch (error: any) {
    console.error("Error uploading PDF:", error.message);
    return res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

export const getURL = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ message: "ID is required" });
    }

    const q = query(
      collection(firestore, "pdfs"),
      where("id", "==", parseInt(id)),
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(404).send({ message: "PDF not found" });
    }
    const data = querySnapshot?.docs[0]?.data();

    const bucket = adminStorage.bucket();
    const file = bucket.file(data?.storagePath);
    const signedUrl = await file.getSignedUrl({
      action: "read",
      expires: Date.now() + 60 * 60 * 1000, // 1 hour
    });

    return res.status(200).send({ url: signedUrl });

    // const payload = {
    //   sample: "sample",
    // };
    // const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    //   expiresIn: "1h",
    // });
    // console.log(token);
    // return res.status(200).send({ token });
  } catch (error: any) {
    console.error("Error getting PDF URL:", error.message);
    return res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};
