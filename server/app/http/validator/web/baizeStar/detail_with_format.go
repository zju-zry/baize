/**
 * @Author: ModestYjx
 * @Description:
 * @File:  questionaire_user
 * @Version: 1.0.0
 * @Date: 2021/11/6 14:44
 */
package baizeStar

import (
	"github.com/gin-gonic/gin"
	"goskeleton/app/global/consts"
	controller "goskeleton/app/http/controller/task"
	"goskeleton/app/http/validator/core/data_transfer"
	"goskeleton/app/utils/response"
)

type DetailWithFormat struct {
	Id string `json:"id" form:"id" binding:"required"`
}

func (t DetailWithFormat) CheckParams(c *gin.Context) {
	//1.先按照验证器提供的基本语法，基本可以校验90%以上的不合格参数
	if err := c.ShouldBind(&t); err != nil {
		errs := gin.H{
			"tips": "TaskDetail参数校验失败，参数不符合规定, 必须上传id",
			"err":  err.Error(),
		}
		response.ErrorParam(c, errs)
		return
	}
	extraAddBindDataContext := data_transfer.DataAddContext(t, consts.ValidatorPrefix, c)
	if extraAddBindDataContext == nil {
		response.ErrorSystem(c, "TaskDetail 表单验证器json化失败", "")
	} else {
		(&controller.Task{}).DetailWithFormat(extraAddBindDataContext)
	}
}