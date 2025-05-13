import { takeLatest, all, call, put } from 'redux-saga/effects';
import { getCollectionsAndDocuments } from '../../utils/firebase/firebase';
import { fetchCategoriesSuccess, fetchCategoriesFailed } from '../categories';
import { CATEGORIES_ACTION_TYPES } from '../categories';
import { CategoryType } from '../../types/category';

export function* fetchCategoriesAsync(): Generator<
  unknown,
  void,
  CategoryType[]
> {
  try {
    const categoriesMap = yield call(getCollectionsAndDocuments);
    yield put(fetchCategoriesSuccess(categoriesMap));
  } catch (error) {
    console.error('Error fetching categories:', error);
    yield put(fetchCategoriesFailed(error));
  }
}

export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
