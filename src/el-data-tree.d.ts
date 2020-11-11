import Vue, {VueConstructor, VNode} from 'vue'

import {Form, Tree} from '@femessage/types/element-ui'

declare module '@femessage/el-data-tree' {
  class FemessageComponent extends Vue {
    static install(vue: typeof Vue): void
  }

  type CombinedVueInstance<
    Instance extends Vue,
    Data,
    Methods,
    Computed,
    Props
  > = Data & Methods & Computed & Props & Instance

  type ExtendedVue<
    Instance extends Vue,
    Data,
    Methods,
    Computed,
    Props
  > = VueConstructor<
    CombinedVueInstance<Instance, Data, Methods, Computed, Props> & Vue
  >

  type Combined<Data, Methods, Computed, Props> = Data &
    Methods &
    Computed &
    Props

  type ElDataTreeData = {
    treeData: any
    filterText: string
    loading: boolean
    dialogTitle: string
    dialogVisible: boolean
    isNew: boolean
    isEdit: boolean
    confirmLoading: boolean
    row: object
    defaultExpandedKeys: any[]
    cacheExpandedKeys: any
    isCollapsed: boolean
  }

  type ElDataTreeMethods = {
    fetchData: () => void

    getTree: () => Tree

    updateCheckedKeys: (keys: any[]) => void
  }

  type ElDataTreeComputed = {}

  export interface FormContentItem {
    id: string
    label?: string | VNode
    [key: string]: any
  }

  export type FormContent = Array<FormContentItem>

  export type ExtraButtonType = 'text' | 'dropdown'

  export interface ExtraButton {
    type: ExtraButtonType
    text: string
    atClick: (data: any, node: any) => Promise<any>
    show: (data: any, node: any) => boolean
  }

  // props 全都有默认值，都是可选的
  export type ElDataTreeProps = Partial<{
    title: string
    hasBorder: boolean
    treeAttrs: Partial<Tree>
    url: string
    parentKey: string
    dataPath: string
    showFilter: boolean
    checkedKeys: any[]
    extraButtons: ExtraButton[]
    extraButtonsType: ExtraButtonType
    form: FormContent
    formAttrs: Partial<Form>
    extraParams: object
    customQuery: object
    hasOperation: boolean
    hasTitle: boolean
    hasHeader: boolean
    hasDelete: boolean
    hasNew: boolean
    hasEdit: boolean
    transform: (data: any) => any
    onNew: (data: any, row: any) => Promise<any>
    onEdit: (data: any, row: any) => Promise<any>
    onDelete: (data: any, node: any) => any
    beforeConfirm: (data: any, isNew: boolean) => Promise<any>
    newText: string
    editText: string
    deleteText: string
    collapsable: boolean
  }>

  type ElDataTree = Combined<
    ElDataTreeData,
    ElDataTreeMethods,
    ElDataTreeComputed,
    Required<ElDataTreeProps>
  >

  export interface ElDataTreeType extends FemessageComponent, ElDataTree {}

  const ElDataTreeConstruction: ExtendedVue<
    Vue,
    ElDataTreeData,
    ElDataTreeMethods,
    ElDataTreeComputed,
    Required<ElDataTreeProps>
  >

  export default ElDataTreeConstruction
}
