// src/features/scores/scoresSlice.ts
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  collection,
  doc,
  updateDoc,
  getDocs,
  getDoc,
  addDoc,
} from 'firebase/firestore';
import { firestore } from '../firebase';

export const firestoreApi = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Timer'],
  endpoints: (builder) => ({
    fetchTimers: builder.query<any, void>({
      async queryFn() {
        try {
          const ref = collection(firestore, 'timers');
          const querySnapshot = await getDocs(ref);
          let timers: any = [];
          querySnapshot?.forEach((doc) => {
            timers.push({ id: doc.id, ...doc.data() } as any);
          });
          return { data: timers };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      providesTags: ['Timer'],
    }),
    fetchTimerById: builder.query<any, any>({
      async queryFn(id) {
        try {
          const snapshot = await getDoc(doc(firestore, 'timers', id));
          return { data: snapshot.data() };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ['Timer'],
    }),
    addTimer: builder.mutation<any, any>({
      async queryFn(data) {
        try {
          const ref = collection(firestore, 'timers');
          const snapshot = await addDoc(ref, data);

          return { data: snapshot.id };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ['Timer'],
    }),
    updateTimer: builder.mutation<any, any>({
      async queryFn({ id, timer, description }) {
        try {
          const snapshot = await updateDoc(doc(firestore, 'timers', id), {
            timer,
            description,
          });

          return { data: snapshot };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ['Timer'],
    }),
  }),
});

export const {
  useFetchTimersQuery,
  useFetchTimerByIdQuery,
  useAddTimerMutation,
  useUpdateTimerMutation,
} = firestoreApi;
