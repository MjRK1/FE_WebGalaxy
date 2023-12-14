import create from 'zustand';

interface IAuthStore {
  isAuth: string | null;
  setAuth: (isAuth: string | null) => void
}

const useAuthStore = create<IAuthStore>((set) => ({
  isAuth: null,
  setAuth: (isAuth) => set(() => ({ isAuth })),
}));

export default useAuthStore;
