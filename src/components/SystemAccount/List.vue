<template>
  <div class="role-wrapper">
    <div class="row wrapper border-bottom white-bg page-heading">
      <div class="col-lg-12">
        <h2>测试管理</h2>
        <ol class="breadcrumb">
          <li>
            <a>系统设置</a>
          </li>
          <li class="active">
            <strong>测试管理</strong>
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
                  <input type="text" placeholder="請輸入角色名稱" class="form-control">
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
  export default {
      mounted () {
          let path = this.$route.path;
          console.log(path);
          this.$store.commit('setCurrentPageName', path);
      }
  };
</script>

<style>
</style>
