import create from 'zustand';
import { IUser } from '../../interfaces/IUser';

interface IUserStore {
  user: IUser | null ;
  setUser: (user: IUser | null) => void
}

const useUserStore = create<IUserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useUserStore;
