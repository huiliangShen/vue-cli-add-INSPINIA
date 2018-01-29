<template>
  <div class="role-wrapper">
    <div class="row wrapper border-bottom white-bg page-heading">
      <div class="col-lg-12">
        <h2>角色管理</h2>
        <ol class="breadcrumb">
          <li>
            <a>系统设置</a>
          </li>
          <li class="active">
            <strong>角色管理</strong>
          </li>
        </ol>
      </div>
    </div>

    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-lg-12">
          <div class="ibox">
            <div class="ibox-content">
              <table id="role_grid"></table>
              <div id="role_pager"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--添加角色-->
    <div id="modal_add" tabindex="-1" class="modal fade" role="dialog" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="gridSystemModalLabel">添加角色</h4>
          </div>
          <div id="add_body" class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label>角色名称</label>
                  <input type="text" placeholder="請輸入角色名稱" class="form-control" v-model="role_name">
                </div>
                <button class="btn btn-sm btn-primary pull-right m-t-n-xs" type="submit">
                  <strong>确定</strong>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import '../../assets/css/plugins/jqGrid/ui.jqgrid.css';
  import $ from 'jquery';
  import '../../assets/js/plugins/jqGrid/i18n/grid.locale-cn.js';
  import '../../assets/js/plugins/jqGrid/jquery.jqGrid.min';
  import {getJqGridHeight} from '../../assets/js/jquery.basic';
  const baseUri = '/api';
  export default {
      data () {
          return {
            role_name: ''
          };
      },
      methods: {
        addRole () {
          $('#modal_add').modal();
        }
      },
      mounted () {
        let path = this.$route.path;
        console.log(path);
        this.$store.commit('setCurrentPageName', '/Home/UserCenter');
        let vm = this;
        /* eslint-disable */
        let roleGrid = '#role_grid';
        let rolePager = '#role_pager';

        $(function () {
          $(roleGrid).jqGrid({
            url: baseUri + '/NewPc/Filter',
            mtype: 'GET',
            datatype: 'json',
            height: getJqGridHeight(),
            autowidth: true,
            shrinkToFit: true,
            rownumbers: true,
            rowNum: 20,
            rowList: [10, 20, 30],
            colNames: ['角色名', '创建时间', '操作'],
            colModel: [
              { name: 'name', index: 'name', width: 60, sortable: false },
              { name: 'creat_time', index: 'creat_time', width: 60, sortable: false },
              { name: 'handle', index: 'handle', width: 30, sortable: false, align: 'center', formatter: handleFormatter }
            ],
            pager: 'role_pager',
            viewrecords: true,
            caption: '角色列表',
            loadComplete: function () {
              $(window).trigger('resize');
            }
          });

          console.log(getJqGridHeight());

          // 操纵
          function handleFormatter(value, rowModel, rowData) {
            return `<a class='text_handle update_module' href='/RoleModule/List?role_id=${rowData.id}'>角色权限配置</a>`;
          }

          // Add responsive to jqGrid
          $(window).bind('resize', function () {
            let width = $(roleGrid).closest('.ibox-content').width();
            $(roleGrid).setGridWidth(width);
          });

          // Setup buttons
          $(roleGrid).jqGrid('navGrid', rolePager, {
            edit: false,
            add: true,
            del: false,
            search: false,
            refresh: true
          });

          // 将表格自带的添加事件取消
          $(roleGrid.replace('#', '#add_')).unbind();
          $(roleGrid.replace('#', '#add_')).bind('click', function () {
            vm.addRole();
          });
        });
      }
  };
</script>

<style>

</style>
