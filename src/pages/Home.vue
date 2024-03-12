<template>
  
    <div class="common-layout">
      <el-container>
        <el-header class="header">Header
            <el-icon ref="btnRef" class="role"  ><Avatar @click="open = true"/></el-icon>Admin      
            
          <el-tour v-model="open">
            <el-tour-step
              title="Edit"
              description="Displayed in the center of screen." />
              <el-button plain @click="dialogFormVisible = true">
                Open a Form nested Dialog
              </el-button>
              <el-dialog v-model="dialogFormVisible" title="Shipping address" width="500">
                <el-form :model="tableData">
                  <el-form-item label="Promotion name" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" />
                  </el-form-item>
                  <el-form-item label="Zones" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="Please select a zone">
                      <el-option label="Zone No.1" value="shanghai" />
                      <el-option label="Zone No.2" value="beijing" />
                    </el-select>
                  </el-form-item>
                </el-form>
                <template #footer>
                  <div class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">
                      Confirm
                    </el-button>
                  </div>
                </template>
              </el-dialog>
          </el-tour>
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
                      <el-menu-item index="2-1">User active management</el-menu-item>
                      <el-menu-item index="2-2">Deactive management</el-menu-item>
                    </el-menu-item-group>
                  </el-sub-menu>
                  <el-sub-menu index="3">
                    <template #title>
                      <el-icon><Van /></el-icon>Delivery/pick-up
                    </template>
                    <el-menu-item-group>
                      <el-menu-item index="3-1">Delivery managerment</el-menu-item>
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
                <HomeFilter />
                <el-scrollbar>
                  <el-table :data="dataPerPage">
                    <el-table-column prop="id" label="ID" width="100" />
                    <el-table-column prop="username" label="Name" width="120" />
                    <el-table-column prop="date_of_birth" label="Date of birth" width="120"/>
                    <el-table-column prop="position" label="Position" width="120"/>
                    <el-table-column prop="phone_number" label="Phone number" width="140"/>
                    <el-table-column prop="cc_number" label="Credit card" width="120"/>
                    <el-table-column prop="email" label="email" width="120"/>
                    <el-table-column prop="status" label="status" width="120"/>
                  </el-table>
                </el-scrollbar>
              </el-main>
            </el-container>
            <el-button type="primary" :icon="Search">Search</el-button>
            <el-button type="warning" @click="handleClear">Reset</el-button>
          </el-container>
        </el-main>
        <el-pagination
          small
          background
          layout="prev, pager, next"
          :total="100"
          class="mt-4 pagination"
          @current-change="handleCurrentChange"
  />
        <el-footer class="footer">Footer</el-footer>
      </el-container>
    </div>
  
</template>

<script lang="ts" setup>
import { Search} from '@element-plus/icons-vue'
import { ref, onMounted, onBeforeMount, computed } from 'vue'
import type { ButtonInstance } from 'element-plus'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { IEmployee, getTable } from '../api/user';
import HomeFilter from '../components/home/Filter.vue';

// type IEmployeeTable = Omit<IEmployee, "cc_number"> & {
//   cc_number?: string;
// };


const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const { state} = useStore()
const router = useRouter()

const search = ref("")
const tableData = ref<IEmployee[]>([])
const filterTable = ref<IEmployee[]>([]);

const currentPage = ref(1);
const dataPerPage = computed(() => {
  return filterTable.value.slice((currentPage.value - 1) * 10, currentPage.value * 10);
});

const checkAccessToken = () => {
  console.log('state', state)
  if (!state.accessToken) {
    router.push("login");
  }
  console.log(state.accessToken);
};

const handleFilter = () => {
  filterTable.value = tableData.value.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(search.value.toLowerCase())
    )
  );
  currentPage.value = 1;
};
const handleClear = () => {
  search.value = "";
  handleFilter();
};

const handleCurrentChange = (val: number) => {
  currentPage.value = val;
}


// const form = reactive({
//   name: '',
//   region: '',
//   date1: '',
//   date2: '',
//   delivery: false,
//   type: [],
//   resource: '',
//   desc: '',
// })

const btnRef = ref<ButtonInstance>()
const open = ref(false)


 
const fetchData = async (): Promise<void> => {
  const { data } = await getTable();

  tableData.value = data.map((item) => {
    const row = {
      id: item.id,
      username: item.username,
      position: item.employment.key_skill,
      date_of_birth: item.date_of_birth,
      phone_number: item.phone_number,
      email: item.email,
      status: item.subscription.status,
      cc_number: item.credit_card.cc_number,
    };
    // if (state.user?.roles.includes("admin")) {
    //   row.cc_number = item.credit_card.cc_number;
    // }
    return row;
  });

  filterTable.value = tableData.value;
};


onBeforeMount(() =>{
  checkAccessToken()
})

onMounted(() => {
  fetchData()
})

</script>

<style scoped>
.header{
  background-color: #409EFF;
}

.main{
  margin-bottom: 50px;
  margin-top: 50px;
}
.footer{
  background-color: #79bbff;
}
.pagination{
  justify-content: center;
  margin-bottom: 20px;
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

  
  