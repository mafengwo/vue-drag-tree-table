const demoDataList =  [
    {
      id: 110,
      parent_id: 0,
      order: 0,
      name: "客户管理",
      uri: "无",
      open: true,
      lists: [
        {
          id: 201,
          parent_id: 110,
          order: 0,
          name: "联系人",
          uri: "/customer/contacts",
          lists: null,
          isShowCheckbox: false,
          highlight: true
        },
        {
          id: 173,
          parent_id: 110,
          order: 1,
          name: "客户",
          uri: "/customer/customerList",
          lists: null,
          checked: true,
        },
        {
          id: 117,
          parent_id: 110,
          order: 2,
          name: "客户维护记录",
          uri: "/customer/maintain",
          lists: null
        },
        {
          id: 383,
          parent_id: 110,
          order: 3,
          name: "客户冲突",
          uri: "无",
          lists: [
            {
              id: 390,
              parent_id: 383,
              order: 0,
              name: "个人冲突",
              uri: "/customer/personalConflict",
              lists: null
            },
            {
              id: 397,
              parent_id: 383,
              order: 1,
              name: "团队冲突",
              uri: "/customer/teamConflict",
              lists: null
            },
            {
              id: 215,
              parent_id: 383,
              order: 2,
              name: "客户查询",
              uri: "/customer/inquiry",
              lists: null
            }
          ]              
        },
        {
          id: 138,
          parent_id: 110,
          order: 4,
          name: "线索管理",
          uri: "/customer/clue",
          lists: null
        },
        {
          id: 159,
          parent_id: 110,
          order: 5,
          name: "集团信息",
          uri: "/customer/agent",
          lists: null
        }
      ]
    },
    {
      id: 404,
      parent_id: 0,
      order: 1,
      name: "审核中心",
      uri: "无",
      lists: [
        {
          id: 187,
          parent_id: 404,
          order: 0,
          name: "资质审核",
          uri: "/customer/qualifications",
          lists: null
        }
      ]
    },
    {
      id: 306,
      parent_id: 0,
      order: 2,
      name: "数据统计",
      uri: "无",
      lists: [
        {
          id: 222,
          parent_id: 306,
          order: 0,
          name: "线索",
          uri: "/customer/clueStatistics",
          lists: null
        },
        {
          id: 124,
          parent_id: 306,
          order: 1,
          name: "客户",
          uri: "/customer/statistics",
          lists: null
        }
      ]
    },
    {
      id: 334,
      parent_id: 0,
      order: 3,
      name: "基础数据",
      uri: "",
      lists: [
        {
          id: 152,
          parent_id: 334,
          order: 0,
          name: "行业信息",
          uri: "/customer/industry",
          lists: null
        },
        {
          id: 166,
          parent_id: 334,
          order: 1,
          name: "客户部门",
          uri: "/customer/departmentType",
          lists: null
        }
      ]
    },
    {
      id: 9,
      parent_id: 0,
      order: 4,
      name: "系统管理",
      uri: "",
      open: false,
      lists: [
        {
          id: 313,
          parent_id: 9,
          order: 0,
          name: "员工管理",
          uri: "/rbac/userManagement",
          lists: [
            {
              id: 412,
              parent_id: 313,
              order: 0,
              name: "员工管理-子节点",
              uri: "/rbac/userManagement",
              lists: null
            }
          ]
        },
        {
          id: 320,
          parent_id: 9,
          order: 1,
          name: "部门管理",
          uri: "/rbac/departmentManagement",
          lists: null
        },
        {
          id: 23,
          parent_id: 9,
          order: 2,
          name: "角色管理",
          uri: "/rbac/roleManagement",
          lists: null
        },
        {
          id: 16,
          parent_id: 9,
          order: 3,
          name: "权限管理",
          uri: "/rbac/authorityManagement",
          lists: null
        },
        {
          id: 2,
          parent_id: 9,
          order: 4,
          name: "菜单管理",
          uri: "/menu/menuManagement",
          lists: null
        },
        {
          id: 107,
          parent_id: 9,
          order: 5,
          name: "操作日志",
          uri: "/operation/log",
          lists: null
        }
      ]
    }
  ]
  export default demoDataList;