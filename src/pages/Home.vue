<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <el-icon ref="btnRef" class="role" @click="open = true"
          ><Avatar />{{ userRole }}</el-icon
        >
        <EditUserModal
          @onClose="handleCloseEditDialog"
          v-model:isShow="open"
          :width="formLabelWidth"
          @roleUpdated="handleRoleUpdated"
          :roles="roleList"
        />
      </el-header>
      <el-main class="main">
        <el-container class="layout-container-demo" style="height: 500px">
          <el-aside width="200px">
            <el-scrollbar>
              <el-menu :default-openeds="['1', '4']">
                <el-sub-menu index="1">
                  <template #title>
                    <el-icon><House /></el-icon>Home
                  </template>
                </el-sub-menu>
                <el-sub-menu index="2">
                  <template #title>
                    <el-icon><User /></el-icon>User
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="2-1"
                      >User active management</el-menu-item
                    >
                    <el-menu-item index="2-2">Deactive management</el-menu-item>
                  </el-menu-item-group>
                </el-sub-menu>
                <el-sub-menu index="3">
                  <template #title>
                    <el-icon><Van /></el-icon>Delivery/pick-up
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="3-1"
                      >Delivery managerment</el-menu-item
                    >
                    <el-menu-item index="3-2">Pick up managerment</el-menu-item>
                  </el-menu-item-group>
                </el-sub-menu>
                <el-sub-menu index="4">
                  <template #title>
                    <el-icon><setting /></el-icon>System
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="3-1">Group management</el-menu-item>
                    <el-menu-item index="3-2">User management</el-menu-item>
                    <el-menu-item index="3-3">System architecture</el-menu-item>
                  </el-menu-item-group>
                </el-sub-menu>
              </el-menu>
            </el-scrollbar>
          </el-aside>

          <el-container>
            <el-main>
              <HomeFilter @onSearch="handleSearchFromChild" :is-display-c-c="isAdmin"/>
              <el-scrollbar>
                <el-table :data="dataPerPage">
                  <el-table-column prop="id" label="ID" width="100" />
                  <el-table-column prop="username" label="Name" width="120" />
                  <el-table-column
                    prop="date_of_birth"
                    label="Date of birth"
                    width="120"
                  />
                  <el-table-column
                    prop="key_skill"
                    label="Position"
                    width="120"
                  />
                  <el-table-column
                    prop="phone_number"
                    label="Phone number"
                    width="140"
                  />
                  <el-table-column
                    prop="cc_number"
                    label="Credit card"
                    width="120"
                    v-if="isAdmin"
                  />
                  <el-table-column prop="email" label="email" width="120" />
                  <el-table-column prop="status" label="status" width="120" />
                </el-table>
              </el-scrollbar>
            </el-main>
          </el-container>
        </el-container>
      </el-main>
      <el-pagination
        small
        background
        layout="prev, pager, next"
        :total="totalPages"
        class="mt-4 pagination"
        @current-change="handleCurrentChange"
      />
      <el-footer class="footer">Footer</el-footer>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeMount, computed } from "vue";
import type { ButtonInstance } from "element-plus";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { IEmployee, getTable, IRole, getRoles } from "../api/user";
import HomeFilter from "../components/home/Filter.vue";
import EditUserModal from "../components/EditUserModal.vue";
import store2 from "../store/store";
const formLabelWidth = "140px";

const store = useStore();
const { state } = useStore();
const router = useRouter();

const tableData = ref<IEmployee[]>([]);
const filterTable = ref<IEmployee[]>([]);
const roleList = ref<IRole[]>([]);

const itemsPerPage = 10;

const totalPages = computed(() => {
  return filterTable.value.length;
});

const currentPage = ref(1);
const dataPerPage = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = currentPage.value * itemsPerPage;
  return filterTable.value.slice(startIndex, endIndex);
});

const checkAccessToken = () => {
  console.log("state", state);
  if (!state.accessToken) {
    router.push("login");
  }
  console.log(state.accessToken);
};

const handleCurrentChange = (val: number) => {
  currentPage.value = val;
};

const btnRef = ref<ButtonInstance>();
const open = ref(false);

const fetchData = async (): Promise<void> => {
  const { data } = await getTable();

  tableData.value = data.map((item) => {
    const row = {
      id: item.id,
      username: item.username,
      key_skill: item.employment.key_skill,
      date_of_birth: item.date_of_birth,
      phone_number: item.phone_number,
      email: item.email,
      status: item.subscription.status,
      cc_number: item.credit_card.cc_number,
    };

    return row;
  });

  filterTable.value = tableData.value;
};

const fetchRoles = async () => {
  const { data } = await getRoles();

  roleList.value = data.roleList.map((item): IRole => {
    return {
      name: item.name,
      description: item.description,
      _id: item._id,
    };
  });
};

const handleCloseEditDialog = (value: boolean) => {
  open.value = value;
};

const handleSearchFromChild = (formFilter: {keyword: string; username: string,  status: string[]; position: string[]; cc_number: string }) => {
  
  filterTable.value = tableData.value.filter((item: IEmployee) => {
    const searchKeyWord = item.phone_number.toLowerCase().includes(formFilter.keyword) || 
      item.email.toLowerCase().includes(formFilter.keyword);

    
    const searchUserName = item.username.toLowerCase().includes(formFilter.username)
    const searchStatus = formFilter.status.length == 0 || formFilter.status.join('|').includes(item.status);
    const searchPosition = formFilter.position.length == 0 || formFilter.position.join('|').includes(item.key_skill);
    const searchCreditCard = item.cc_number.toLowerCase().includes(formFilter.cc_number);
    
    return searchKeyWord && searchUserName && searchStatus && searchPosition && searchCreditCard;
    
  });
};

const userRole = computed(() => {
  const userInfo = store.getters.getUserInfo;
  return userInfo ? userInfo.username : [];
});
const btnRole = ref(null);

const handleRoleUpdated = () => {
  if (btnRole.value) {
    btnRole.value.innerText = userRole.value;
  }
};

//check display col cc_number
// const isAdmin = ref(false)

const isAdmin = computed(() => {
  console.log(isAdmin);
  
  return store2.state.isAdmin  
})


onBeforeMount(() => {
  checkAccessToken();
  fetchRoles();
});

onMounted(() => {
  fetchData();  
});
</script>

<style scoped>
.header {
  background-color: #409eff;
}

.main {
  margin-bottom: 50px;
  margin-top: 50px;
}
.footer {
  background-color: #79bbff;
}
.pagination {
  justify-content: center;
  margin-bottom: 20px;
}
.mb-2 {
  margin-bottom: 0.5rem !important;
}
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>

  
  