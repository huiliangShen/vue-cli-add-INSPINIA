<template>
  <div class="home-wrapper">
    <div class="row wrapper border-bottom white-bg page-heading">
      <div class="col-sm-4">
        <h2>主页</h2>
        <ol class="breadcrumb">
          <li class="active">
            <strong>桌面</strong>
          </li>
        </ol>
      </div>
    </div>
    <div class="wrapper wrapper-content animated">
      <div class="row">
        <div v-if="role === 1 || role === 2" v-bind:class="{'col-lg-3':role === 1,'col-lg-4': role > 1}">
          <div class="ibox float-e-margins">
            <div class="ibox-title">
              <h5 class="text-center">待处理初审</h5>
              <div class="ibox-tools">
                <a class="collapse-link">
                  <i class="fa fa-chevron-up"></i>
                </a>
                <a class="close-link">
                  <i class="fa fa-times"></i>
                </a>
              </div>
            </div>
            <div class="ibox-content" style="height:271px;overflow-y:scroll;">
              <table class="table table-hover no-margins" v-if="is_show">
                <thead>
                <tr>
                  <th>姓名</th>
                  <th>评估类型</th>
                  <th>申请时间</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in unInitFilter" v-on:click.prevent.stop="goTo(1)" style="cursor:pointer" :key="item.type">
                  <td v-cloak>{{item.name}}</td>
                  <td v-cloak>{{item.type}}</td>
                  <td v-cloak>{{item.update_time}}</td>
                </tr>
                </tbody>
              </table>
              <table class="table table-hover no-margins" v-else>
                <thead>
                <tr>
                  <th>姓名</th>
                  <th>评估类型</th>
                  <th>申请时间</th>
                </tr>
                </thead>
                <tr>
                  <td class="text-center" colspan="3">
                    <img src="" />
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div v-if="role === 1 || role === 3" v-bind:class="{'col-lg-3':role === 1,'col-lg-4': role > 1}">
          <div class="ibox float-e-margins">
            <div class="ibox-title">
              <h5 class="text-center">待处理复审</h5>
              <div class="ibox-tools">
                <a class="collapse-link">
                  <i class="fa fa-chevron-up"></i>
                </a>
                <a class="close-link">
                  <i class="fa fa-times"></i>
                </a>
              </div>
            </div>
            <div class="ibox-content" style="height:271px;overflow-y:scroll;">
              <table class="table table-hover no-margins" v-if="is_show_1">
                <thead>
                <tr>
                  <th>姓名</th>
                  <th>评估类型</th>
                  <th>申请时间</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in unReviewFilter" v-on:click.prevent.stop="goTo(2)" style="cursor:pointer" :key="item.type">
                  <td v-cloak>{{item.name}}</td>
                  <td v-cloak>{{item.type}}</td>
                  <td v-cloak>{{item.update_time}}</td>
                </tr>
                </tbody>
              </table>
              <table class="table table-hover no-margins" v-else>
                <thead>
                <tr>
                  <th>姓名</th>
                  <th>评估类型</th>
                  <th>申请时间</th>
                </tr>
                </thead>
                <tr>
                  <td class="text-center" colspan="3">
                    <img src="" />
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div v-bind:class="{'col-lg-6':role === 1,'col-lg-8': role > 1}">
          <div class="ibox float-e-margins">
            <div class="ibox-title">
              <h5 class="text-center">查询评估历史</h5>
              <div class="ibox-tools">
                <a class="collapse-link">
                  <i class="fa fa-chevron-up"></i>
                </a>
                <a class="close-link">
                  <i class="fa fa-times"></i>
                </a>
              </div>
            </div>

            <div class="ibox-content" style="height:271px;overflow-y:scroll;">
              <div class="form-group">
                <div class="col-lg-3">
                  <input class="form-control" type="text" placeholder="按姓名查询" v-model="name" id="name_text">
                </div>
                <div class="col-lg-3">
                  <input class="form-control" type="text" placeholder="身份证号码查询" v-model="idcard" id="idcard_text">
                </div>
                <div class="col-lg-3">
                  <select class="form-control" v-on:change="getAssessmentReportFiler()" v-model="level_name">
                    <option value="">评估等级</option>
                    <option value="能力完好">能力完好</option>
                    <option value="轻度失能">轻度失能</option>
                    <option value="中度失能">中度失能</option>
                    <option value="重度失能">重度失能</option>
                  </select>
                </div>
                <div class="col-lg-3">
                  <select class="form-control" v-model="type" v-on:change="getAssessmentReportFiler()">
                    <option value="">评估类型</option>
                    <option value="初始评估">初始评估</option>
                    <option value="复核评估">复核评估</option>
                    <option value="期末评估">期末评估</option>
                    <option value="变更评估">变更评估</option>
                  </select>
                </div>
              </div>
              <table class="table table-hover no-margins">
                <thead>
                <tr>
                  <th>序号</th>
                  <th>姓名</th>
                  <th>评估类型</th>
                  <th>等级</th>
                  <th>评估报告生效时间</th>
                </tr>
                </thead>
                <tbody v-if="is_show_2">
                <tr v-for="item in assessmentReport" track-by="$index" :key="item.type">
                  <td>{{$index+1}}</td>
                  <td v-cloak>{{item.name}}</td>
                  <td v-cloak>{{item.type}}</td>
                  <td v-cloak>{{item.level_name ? item.level_name:"-"}}</td>
                  <td v-cloak>{{item.audit_time}}</td>
                </tr>
                </tbody>
                <tbody v-else>
                <tr>
                  <td class="text-center" colspan="5">
                    <img src="" />
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4">
          <div class="ibox float-e-margins">
            <div class="ibox-title">
              <h5 class="text-center">评定告知书待通知</h5>
              <div class="ibox-tools">
                <a class="collapse-link">
                  <i class="fa fa-chevron-up"></i>
                </a>
                <a class="close-link">
                  <i class="fa fa-times"></i>
                </a>
              </div>
            </div>
            <div class="ibox-content" style="height:237px;overflow-y:scroll;">
              <table class="table table-hover no-margins">
                <thead>
                <tr>
                  <th>姓名</th>
                  <th>评估类型</th>
                  <th>申请时间</th>
                </tr>
                </thead>
                <tbody v-if="is_show_3">
                <tr v-for="item in allReviewFilter" style="cursor:pointer" v-on:click.prevent.stop="goTo(3)" :key="item.type">
                  <td v-cloak>{{item.name}}</td>
                  <td v-cloak>{{item.type}}</td>
                  <td v-cloak>{{item.review_time ? item.review_time.split(' ')[0]: item.review_time}}</td>
                </tr>
                </tbody>
                <tbody v-else>
                <tr>
                  <td class="text-center" colspan="3">
                    <img src="" />
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="ibox float-e-margins">
            <div class="ibox-title">
              <h5 class="text-center">评估报告待通知</h5>
              <div class="ibox-tools">
                <a class="collapse-link">
                  <i class="fa fa-chevron-up"></i>
                </a>
                <a class="close-link">
                  <i class="fa fa-times"></i>
                </a>
              </div>
            </div>
            <div class="ibox-content" style="height:237px;overflow-y:scroll;">
              <table class="table table-hover no-margins">
                <thead>
                <tr>
                  <th>姓名</th>
                  <th>评估类型</th>
                  <th>剩余时间</th>
                </tr>
                </thead>
                <tbody v-if="is_show_4">
                <tr v-for="item in uninformAssessmentReport" :key="item.type" style="cursor:pointer" v-on:click.prevent.stop="goTo(4)">
                  <td v-cloak>{{item.name}}</td>
                  <td v-cloak>{{item.type}}</td>
                  <td v-cloak>{{item.time}}</td>
                </tr>
                </tbody>
                <tbody v-else>
                <tr>
                  <td class="text-center" colspan="3">
                    <img src="" />
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="ibox float-e-margins">
            <div class="ibox-title">
              <h5 class="text-center">评估有效期到期通知</h5>
              <div class="ibox-tools">
                <a class="collapse-link">
                  <i class="fa fa-chevron-up"></i>
                </a>
                <a class="close-link">
                  <i class="fa fa-times"></i>
                </a>
              </div>
            </div>
            <div class="ibox-content" style="height:237px;overflow-y:scroll;">
              <table class="table table-hover no-margins">
                <thead>
                <tr>
                  <th>姓名</th>
                  <th>评估类型</th>
                  <th>申请时间</th>
                </tr>
                </thead>
                <tbody v-if="is_show_5">
                <tr v-for="item in expireAssessmentReportFiler" :key="item.type">
                  <td v-cloak>{{item.name}}</td>
                  <td v-cloak>{{item.type}}</td>
                  <td v-cloak>{{item.time}}</td>
                </tr>
                </tbody>
                <tbody v-else>
                <tr>
                  <td class="text-center" colspan="3">
                    <img src="" />
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6">
          <div class="ibox float-e-margins">
            <div class="ibox-title">
              <h5 v-cloak>公示内容（{{(other_length > 0 ? "剩余" + other_length + "条未公示":"已全部公示")}}）</h5>
              <div class="ibox-tools">
                <a class="collapse-link">
                  <i class="fa fa-chevron-up"></i>
                </a>
                <a class="close-link">
                  <i class="fa fa-times"></i>
                </a>
              </div>
            </div>
            <div class="ibox-content" style="height:230px;overflow-y:scroll;">

              <div class="row">
                <table class="table table-hover margin bottom">
                  <thead>
                  <tr>
                    <th style="width: 10%" class="text-center">序号</th>
                    <th>消息内容</th>
                  </tr>
                  </thead>
                  <tbody v-if="is_show_6">
                  <tr v-for="item in notices" track-by="$index" :key="item.id">
                    <td class="text-center">{{$index+1}}</td>
                    <td v-cloak>
                      姓名：{{item.name}}:长期护理保险失能评估结果于{{item.update_time}}生效，评估结果为<b>{{item.level_name}}</b>，公示时间{{item.notice_time ? item.notice_time:""}}至{{item.over_notice_time ? item.over_notice_time:""}}，公示时间剩余{{item.time}}；
                    </td>
                  </tr>
                  </tbody>
                  <tbody v-else>
                  <tr>
                    <td class="text-center" colspan="2">
                      <img src="" />
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="ibox float-e-margins">
            <div class="ibox-title">
              <h5>本月工作考核</h5>
              <div class="ibox-tools">
                <a class="collapse-link">
                  <i class="fa fa-chevron-up"></i>
                </a>
                <a class="close-link">
                  <i class="fa fa-times"></i>
                </a>
              </div>
            </div>
            <div class="ibox-content">

              <div class="row">
                <div class="col-lg-6">
                  <table class="table table-hover margin bottom">
                    <thead>
                    <tr>
                      <th>申请人数</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td v-cloak>
                        本月申请初始评估人数：{{first_number}}人
                      </td>
                    </tr>
                    <tr>
                      <td v-cloak>
                        本月申请变更评估人数：{{second_number}}人
                      </td>

                    </tr>
                    <tr>
                      <td v-cloak>
                        本月申请复核评估人数：{{third_number}}人
                      </td>

                    </tr>
                    <tr>
                      <td v-cloak>本月申请期末评估人数：{{four_number}}人</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <div class="col-lg-6">
                  <table class="table table-hover margin bottom">
                    <thead>
                    <tr>
                      <th>完成评估数量</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td v-cloak>
                        今日：{{finish_assess.day}}人
                      </td>
                    </tr>
                    <tr>
                      <td v-cloak>
                        本周：{{finish_assess.week}}人
                      </td>

                    </tr>
                    <tr>
                      <td v-cloak>
                        本月：{{finish_assess.month}}人
                      </td>

                    </tr>
                    <tr>
                      <td v-cloak>本年：{{finish_assess.year}}人</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        role: 0,
        unInitFilter: [],
        unReviewFilter: [],
        allReviewFilter: [],
        assessmentReport: [],
        uninformAssessmentReport: [],
        expireAssessmentReportFiler: [],
        notices: [],
        idcard: '',
        name: '',
        type: '',
        level_name: '',
        is_show: false,
        is_show_1: false,
        is_show_2: false,
        is_show_3: false,
        is_show_4: false,
        is_show_5: false,
        is_show_6: false,
        first_number: 0,
        second_number: 0,
        third_number: 0,
        four_number: 0,
        other_length: 0,
        finish_assess: {
          day: 0,
          week: 0,
          month: 0,
          year: 0
        }
      };
    }
  };
</script>

<style>

</style>
