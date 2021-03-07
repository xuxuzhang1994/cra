import { Table, Space, Input, PaginationProps, Card, Row, Col, Modal, message } from "antd";
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import styles from './index.module.less'
import { http } from '../../utils/http'

const { Search } = Input;

interface EditModalProps {
  visible: boolean,
  onOk?: (value: any) => void,
  onCancel?: () => void,
  info: User | any
}

const EditModal = ({info, ...modalProps} : EditModalProps) => {
  const [value, setValue] = useState('')
  const onOk = () => {
    modalProps.onOk && modalProps.onOk(value)
  }
  const inputChange = (e: ChangeEvent<{value: string}>) => {
    console.log(e.target.value)
    setValue(e.target.value)
  }
  useEffect(() => {
    if(!modalProps.visible){
      setValue('')
    }
  },[modalProps.visible])
  return (
    <Modal title="修改信息" {...modalProps} onOk={onOk}>
      <p>你要修改的条目为 </p>
      <p>手机号：{info?.mobile}</p>
      <p>身份证号：{info?.number}</p>
      <Input value={value} placeholder="请输入正确的手机号" onChange={inputChange} />
    </Modal>
  )
}

interface User {
  id: string,
  mobile: string,
  number: string,
  money: string,
}

const Index = (props: unknown) => {
  const columns = [
    {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile',
      render: (text: any, record: User) => (
        <a>{record.mobile}</a>
      ),
    },
    {
      title: '身份证号',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: '档位',
      dataIndex: 'money',
      key: 'money',
    },
    {
      title: '操作',
      key: 'action',
      render: (text: any, record: User) => (
        <Space size="middle">
          <a onClick={() => edit(record)}>修改</a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchData({
      page: 1,
      limit: 10
    })
  }, [])
  const pageOnChange: (page: number, pageSize?: number) => void = (page, pageSize) => {
    const params = {
      page,
      limit: pageSize || 10
    }
    fetchData(params)
    console.log({ page, pageSize })
  }

  const edit = (user: User) => {
    setModalVisible(true)
    setUserInfo(user)
    console.log(user)
  }

  const [dataSource, setDatasource] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: 10,
    onChange: pageOnChange,
    total: 0
  })
  const [modalVisible, setModalVisible] = useState(false)
  const [userInfo, setUserInfo] = useState({
    id: ''
  })
  const onSearch = (value: string) => {
    setIsLoading(true)
    http(`whiteList/getlist`, {
      data: {
        page: 1,
        limit: 20,
        mobile: value
      }
    }).then(data => {
      setDatasource(data.data.list)
      setIsLoading(false)
      setPagination({
        ...pagination,
        total: data.data.total,
        current: data.data.page,
        pageSize: data.data.limit
      })
    })
  }

  const fetchData = (params: { page?: number, limit?: number }) => {
    setIsLoading(true)
    http(`whiteList/getlist`, {
      data: params
    }).then(data => {
      if (data.code === 200) {
        setDatasource(data.data.list)
        setIsLoading(false)
        setPagination({
          ...pagination,
          total: data.data.total,
          current: data.data.page,
          pageSize: data.data.limit
        })
      }
    })
  }

  const onOk = (value: any) => {
    http('/whiteList/update',{
      method: 'PUT',
      data: {
        id: userInfo.id,
        mobile: value
      }
    }).then(data => {
      if(data.code == 200){
        setModalVisible(false)
        message.success('更新成功！')
        fetchData({
          page: pagination.current,
          limit: pagination.pageSize,
        })
      }else{
        message.error(data.data)
      }
    })
  }

  return <div>
    <div className={styles.searchBox}>
      <Row>
        <Col xl={8} md={12} sm={24} xs={24}> <Search placeholder="输入手机号搜索" onSearch={onSearch} enterButton /> </Col>
      </Row>
    </div>
    <Card>
      <Table scroll={{x: '100%'}} rowKey="id" loading={isLoading} dataSource={dataSource} columns={columns} pagination={pagination} />
    </Card>
    <EditModal visible={modalVisible} info={userInfo} onOk={onOk} onCancel={() => setModalVisible(false)} />
  </div>
}

export default Index