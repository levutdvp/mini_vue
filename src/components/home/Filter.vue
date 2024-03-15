<template>
  <el-row>
    <el-col :span="20">
      <el-form label-width="auto">
        <el-form-item class="form-item" label="Keyword" prop="keyword">
          <el-input v-model="search" @input="validateKeyword" />
          <span class="danger" v-if="!isKeywordValid"
            >Keyword is required and cannot contain special characters.</span
          >
        </el-form-item>
        <el-form-item class="form-item" label="Username">
          <el-col :span="9">
            <el-input v-model="username" />
          </el-col>
          <el-col :span="2"> </el-col>
          <el-col :span="13">
            <el-form-item class="form-item" label="Date of birth">
              <el-date-picker
                type="date"
                placeholder="Pick a date"
                style="width: 100%"
                v-model="dateOfBirth"
              />
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item class="form-item" label="Position">
          <el-col :span="9">
            <el-select multiple v-model="position" placeholder="Please select position">
              <el-option
                v-for="item in positionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col :span="2"> </el-col>
          <el-col :span="13">
            <el-form-item class="form-item" label="Status">
              <el-select multiple v-model="status" placeholder="Please select status">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item class="form-item" label="Credit card">
          <el-col :span="9">
            <el-input v-model="creditCard" />
          </el-col>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="4">
      <div class="mb-2">
        <el-button type="primary" :icon="Search" @click="handleSearch(false)"
          >Search</el-button
        >
      </div>
      <div>
        <el-button type="warning" @click="handleSearch(true)">Reset</el-button>
      </div>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { TOption } from "../../types/common";

interface positionOptions {
  value: string;
  label: string;
}

const username = ref("");
const dateOfBirth = ref(null);
const creditCard = ref("");
const search = ref('')
const status = ref<string[]>([]);
const position = ref<string[]>([]);

const positionOptions = ref<positionOptions[]>([
  {
    value: "Proactive",
    label: "Proactive",
  },
  {
    value: "Teamwork",
    label: "Teamwork",
  },
  {
    value: "Self-motivated",
    label: "Self-motivated",
  },
  {
    value: "Communication",
    label: "Communication",
  },
  {
    value: "Networking skills",
    label: "Networking skills",
  },
  {
    value: "Fast learner",
    label: "Fast learner",
  },
  {
    value: "Leadership",
    label: "Leadership",
  },
  {
    value: "Work under pressure",
    label: "Work under pressure",
  },
  {
    value: "Confidence",
    label: "Confidence",
  },
  {
    value: "Problem solving",
    label: "Problem solving",
  },
]);
const statusOptions = ref<TOption[]>([
  {
    value: "Blocked",
    label: "Blocked",
  },
  {
    value: "Active",
    label: "Active",
  },
  {
    value: "Pending",
    label: "Pending",
  },
]);


const emit = defineEmits(["onSearch"]);

const isKeywordValid = ref(true);
const validateKeyword = () => {
  const regex = /^[a-zA-Z0-9_ ]*$/;
  isKeywordValid.value =regex.test(search.value.trim());
};


const formSearch = reactive({
  keyword: '',
  username: '',
  date_of_birth: '',
  position: [],
  phone_number: '',
  cc_number: '',
  email: '',
  status: []
});

const handleSearch = (isReset: boolean = false) => {
  if (!isReset) {
    if(!isKeywordValid.value) return
    formSearch.keyword = search.value
    formSearch.username = search.value
    formSearch.phone_number = search.value 
    formSearch.status = status.value 
    formSearch.position = position.value 
    formSearch.cc_number = creditCard.value 
  }
  else {
    resetForm();
  }
  emit("onSearch", formSearch);
};

const resetForm = () => {
  formSearch.keyword = '';
  formSearch.username = '';
  formSearch.date_of_birth = '';
  formSearch.position = [];
  formSearch.phone_number = '';
  formSearch.cc_number = '';
  formSearch.email = '';
  formSearch.status = [];

  username.value = "";
  status.value = [];
  position.value = [];
  search.value = "";
  dateOfBirth.value = null;
  creditCard.value = "";

  isKeywordValid.value = true;
};

</script>
<style scoped>
.mb-2 {
  margin-bottom: 0.5rem !important;
}
.danger {
  color: red;
}
</style>