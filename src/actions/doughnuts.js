export const fetchDoughnutsSuccess = (doughnuts) => {
    return {
        type: 'FETCH_DOUGHNUTS_SUCCESS',
        doughnuts: doughnuts
    }
  }