import { addDoc, collection } from '@firebase/firestore';
import { firestore } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
export const handleSubmit = (testdata: {}) => {
  const ref = collection(firestore, 'timers');

  let data = {
    testData: testdata,
  };

  try {
    addDoc(ref, data).then((docRef) => console.log(docRef.id));
  } catch (err) {
    console.log(err);
  }
};

export const getTimerById = async () => {
  const snap = await getDoc(doc(firestore, 'timers', '2CdiUojS02QvDFWx2jQP'));

  if (snap.exists()) {
    console.log(snap.data());
  } else {
    console.log('No such document');
  }
};
