<template>
  <el-dialog v-model="isShow" title="User information" width="500">
    <el-form>
      <el-form-item label="Username" :label-width="props.width">
        <el-input v-model="form.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Role" :label-width="props.width">
        <el-select
          :disabled="!isChangeRole"
          v-model="form.roles"
          placeholder="Please select role"
          multiple
        >
          <el-option
            v-for="item in roleOptions"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose($emit)">Cancel</el-button>
        <el-button type="primary" @click="handleUpdateUser"> Update </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, defineProps, onUpdated } from "vue";
import { getRoles, IRole, IUser, updateUser, getUser } from "../api/user";
import store from "../store/store";
import { ElNotification } from "element-plus";

const isShow = defineModel<boolean>("isShow", { required: true });

const isChangeRole = ref(false);

const props = defineProps({
  width: {
    type: String,
    default: "140px",
  },
});

const roleOptions = ref<IRole[]>([]);
const form = ref<{
  username: string;
  roles: string[];
}>({
  username: "",
  roles: [],
});

const fetchRoles = async () => {
  const { data } = await getRoles();

  roleOptions.value = data.roleList.map((item): IRole => {
    return {
      name: item.name,
      description: item.description,
      _id: item._id,
    };
  });
};

const handleUpdateUser = async () => {
  if (store.state.user != null) {
    const formData = {
      username: form.value.username,
      roles: form.value.roles,
    };

    if (!isChangeRole.value) {
      delete formData.roles;
    }
    const { data } = await updateUser(store.state.user._id, formData);

    ElNotification({
      title: "Success",
      message: data.message,
      type: "success",
    });

    isShow.value = false;

    store.dispatch("pushUserInfo");
  }
};

onUpdated(() => {
  if (isShow.value) {
    fetchRoles();
    if (store.state.user != null && form.value != undefined) {
      form.value.username = store.state.user.username;
      form.value.roles = store.state.user.roles.map((item) => item._id);

      const roleString = store.state.user.roles
        .map((item) => item.name)
        .join(";");

      if (roleString.includes("admin")) {
        isChangeRole.value = true;
      }
    }
  } else {
    form.value.username = "";
    form.value.roles = [];
  }
});

const handleClose = (emit: Function) => {
  emit("onClose", false);
};
</script>
<style scoped></style>
