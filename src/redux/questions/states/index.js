export const initialState = {
  list: [],
  list_type: '',
  results: [],
  active_id: '',
  deleted_id: '',
  finished_id: '',
  voice_given_id: '',
  //todo: get question types from db
  question_types: [
    {
      id: "507f1f77bcf86cd799439100",
      name: 'radio'
    },
    {
      id: "507f1f77bcf86cd799439101",
      name: 'checkbox'
    }
  ],
};
