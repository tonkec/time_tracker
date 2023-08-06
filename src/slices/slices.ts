import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  collection,
  doc,
  updateDoc,
  getDocs,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';
import { firestore } from '../firebase';

export const firestoreApi = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Timer'],
  endpoints: (builder) => ({
    addUser: builder.mutation<any, any>({
      async queryFn(user) {
        try {
          const ref = collection(firestore, 'users');
          const uid = user.uid;
          const snapshot = await addDoc(ref, {
            uid,
          });

          return { data: snapshot.id };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ['Timer'],
    }),
    fetchTimers: builder.query<any, any>({
      async queryFn(currentUserId) {
        const id = currentUserId.uid || currentUserId;
        try {
          const ref = collection(firestore, 'timers');
          const querySnapshot = await getDocs(ref);
          let timers: any = [];
          querySnapshot?.forEach((doc) => {
            if (doc.data().userId === id) {
              timers.push({ id: doc.id, ...doc.data() } as any);
            }
          });
          return { data: timers };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      providesTags: ['Timer'],
    }),

    addTimer: builder.mutation<any, any>({
      async queryFn({ description, timer, createdAt, intervalId, userId }) {
        const id = userId.uid || userId;
        try {
          const ref = collection(firestore, 'timers');
          const snapshot = await addDoc(ref, {
            description,
            timer,
            createdAt,
            intervalId,
            userId: id,
          });

          return { data: snapshot.id };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ['Timer'],
    }),
    updateTimer: builder.mutation<any, any>({
      async queryFn({ id, timer, description, intervalId, userId }) {
        const currentUserId = userId.uid || userId;
        try {
          const snapshot = await updateDoc(doc(firestore, 'timers', id), {
            timer,
            description,
            intervalId,
            userId: currentUserId,
          });

          return { data: snapshot };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ['Timer'],
    }),
    deleteTimer: builder.mutation<any, any>({
      async queryFn(id) {
        try {
          const snapshot = await deleteDoc(doc(firestore, 'timers', id));
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
  useAddTimerMutation,
  useUpdateTimerMutation,
  useDeleteTimerMutation,
  useAddUserMutation,
} = firestoreApi;
