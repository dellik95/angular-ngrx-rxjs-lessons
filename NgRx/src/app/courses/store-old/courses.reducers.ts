import { createSelector, on } from '@ngrx/store';
import { createFeature, createReducer } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { compareCourses, Course } from '../model/course';
import { CourseActions } from '.';


export interface CoursesState extends EntityState<Course> {
  allCoursesLoaded: boolean;
}

export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses,
  selectId: c => c.id
});

export const initialState: CoursesState = adapter.getInitialState({
  allCoursesLoaded: false
});

export const coursesReducer = createReducer(
  initialState,
  on(CourseActions.allCoursesLoadedAction, (state, action) => {
    var newState = {
      ...state,
      allCoursesLoaded: true
    }
    return adapter.addMany(action.courses, newState);
  }),
  on(CourseActions.courseUpdatedAction, (state, action) => adapter.updateOne(action.update, state))

);

export const coursesFeature = createFeature({
  name: "courses",
  reducer: coursesReducer
});



export const { selectAll } = adapter.getSelectors(coursesFeature.selectCoursesState);


export const CoursesSelectors = {
  selectAll: selectAll,
  selectBeginnerCourses: createSelector(selectAll, x => x.filter(c => c.category === "BEGINNER")),
  selectAdvancedCourses: createSelector(selectAll, x => x.filter(c => c.category === "ADVANCED")),
  selectPromoTotal: createSelector(selectAll, x => x.filter(c => c.promo).length),
  areCoursesLoaded: coursesFeature.selectAllCoursesLoaded
};

