import * as React from 'react'

import { Button, Card, Form, Input, List } from 'antd'
import { Formik, FormikActions, FormikConfig, FormikProps } from 'formik'

export type Values = {
  subreddit: string
}

type FormProps = FormikProps<Values>

type ViewProps = {
  isLoading?: boolean
  initialValues: FormProps['initialValues']
  posts?: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
}

type ActionProps = {
  onSubmit: (data: Values, formikActions: FormikActions<Values>) => void
  validationSchema?: FormikConfig<Values>['validationSchema']
  onLinkClick: (
    event: React.MouseEvent<HTMLAnchorElement>,
    permalink: string
  ) => void
}

export type Props = ViewProps & ActionProps

const Subreddit: React.FC<Props> = ({
  initialValues,
  onLinkClick,
  onSubmit,
  validationSchema,
  posts,
  isLoading,
}) => {
  return (
    <React.Fragment>
      <Card>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          onSubmit={onSubmit}
          render={({
            touched,
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            values,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Item
                colon={false}
                help={touched.subreddit && errors.subreddit}
                label="Subreddit"
                required={true}
                validateStatus={
                  touched.subreddit && errors.subreddit ? 'error' : 'success'
                }
              >
                <Input
                  disabled={isLoading}
                  id="subreddit"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.subreddit}
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                  Search
                </Button>
              </Form.Item>
            </Form>
          )}
          validationSchema={validationSchema}
        />
      </Card>
      <Card>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={posts}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          renderItem={item => (
            <List.Item
              key={item.title}
              extra={
                item.thumbnail === '' ? undefined : <img src={item.thumbnail} />
              }
            >
              <List.Item.Meta
                title={
                  <a onClick={event => onLinkClick(event, item.permalink)}>
                    {item.title}
                  </a>
                }
                description={item.selftext}
              >
                {item.selftext}
              </List.Item.Meta>
            </List.Item>
          )}
        />
      </Card>
    </React.Fragment>
  )
}

export default Subreddit
