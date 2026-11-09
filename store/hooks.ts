import {useDispatch, useSelector} from 'react-redux'
import type {AppDispatch, RootState} from './index.ts'

// Hook có kiểu sẵn, dùng thay cho useDispatch / useSelector thường
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
