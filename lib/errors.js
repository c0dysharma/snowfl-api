class ApiError extends Error{
  constructor(message=''){
    super(message);
    this.name = 'ApiEror'
  }
}
class FetchError extends Error{
  constructor(message=''){
    super(message);
    this.name = 'FetchError'
  }
}

module.exports = {ApiError, FetchError}