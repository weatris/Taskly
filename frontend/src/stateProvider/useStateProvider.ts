import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { ConfigSlice } from './config';
import { bindActionCreators } from '@reduxjs/toolkit';

export const useStateProvider = () => {
  const dispatch = useDispatch();
  return {
    state: useSelector((state: RootState) => state),
    actions: bindActionCreators(
      {
        ...ConfigSlice.actions,
      },
      dispatch,
    ),
  };
};
