export const BASE_PATH = "http://112.74.125.184:9527/common/download?name=";

export const LOGIN = "/user/login";

export const UPDATE_USER = "/user/update-user";

export const GET_INFO_BY_TOKEN = "/user/get-by-token";

export const GET_LOGIN_OUT = "/user/login-out";
//获取所有模板
export const GET_ALL_PROJECT = "/reimbursement-template/get-all";
//获取某个报销项目的信息
export const GET_PROJECT_BY_ID = "/reimbursement-template/get-by-id";
//获取某个申请的信息
export const GET_APPLY_BY_ID = "/invoice/get-by-id";
//得到我所有的申请
export const GET_ALL_OF_MY_ITEMS = "/invoice/get-for-apply";
//
export const POST_SUBMIT_AN_APPLY = "/invoice/submit-invoice";
//点击申请
export const POST_ADD_AN_APPLY = "/invoice/apply";
//撤销一条申请
export const POST_WITHDRAW_A_APPLY = "/invoice/withdraw";
//获取所有要审核的项目
export const GET_ALL_TO_BE_REVIEW = "/invoice/get-for-unit";
//管理员删除一个报销项目
export const POST_REMOVE_A_PROJECT = "/reimbursement-template/remove-template";
//上传文件
export const POST_UPLOAD_FILE = "/common/upload";
//
export const GET_UNIT_TYPE = "/dd-unit/get-unit";
//
export const GET_ROLE_TYPE = "/dd-role/get-role";
//新增用户
export const POST_ADD_A_USER = "/user/insert-user";
//下载图片
export const GET_DOWNLOAD_IM = "/common/download";
//获取发票的所有种类（用于选择）
export const GET_ALL_INVOICE_TYPE = "/dd-invoice-category/get-category";
//增加一条发票明细
export const POST_ADD_INVOICE_DETAILS = "/invoice/add-details";
//删除一条发票明细
export const POST_DELETE_INVOICE_DETAILS = "/invoice/delete-details";
//管理员添加一个报销项目
export const POST_ADD_A_PROJECT = "/reimbursement-template/insert-template";
//管理员删除一个用户
export const POST_DELETE_USER = "/user/disable1-user";
//确定通过一个申请（审批）
export const POST_AGREE_AN_APPLY = "/invoice/through-invoice";
//确定驳回一条申请
export const POST_REJECT_AN_ALLPY = "/invoice/rejected-invoice";
//根据用户账号获取用户信息
export const GET_BY_USERNAME = "/user/get-by-userName";
//管理员修改用户信息
export const POST_MODIFY_USER = "/user/update-user-by-administrator";
//修改报销项目信息
export const POST_MODIFY_PROJECT = "/reimbursement-template/update-template";
//管理员给单位授权
export const POST_EMPOWER = "/user-unit-map/add-unit-map";
//管理员移除单位权力
// export const POST_ = "/user-unit-map/delete-unit-map";
//
// export const  = "";
//
// export const  = "";
//
// export const  = "";
//
// export const  = "";
//
// export const  = "";
//
// export const  = "";
//
// export const  = "";
//
// export const  = "";
//
// export const  = "";
//
// export const  = "";
//
// export const  = "";
//
// export const  = "";
//
// export const  = "";
//
// export const  = "";
//
