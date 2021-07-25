import api from "./api_json";

const createComment = data => api.post(`${api.url.commentlink}/create`, data);

const getAllCommentByProductId = data => api.get(`${api.url.commentlink}/${data}`);

const editComment = data => api.put(`${api.url.commentlink}/edit`, data)

export default{
  createComment, getAllCommentByProductId, editComment
}