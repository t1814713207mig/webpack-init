import React, { lazy, Suspense } from 'react';
import { ConfigProvider } from 'antd';
import 'antd/dist/antd.css';
import zhCN from 'antd/es/locale-provider/zh_CN';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from '@src/components/layout';
import NotFound from '@src/components/notfound';
import Loading from '@src/components/loading';
import router from '@src/views/router';
import './listapp.less';

function ListApp() {
  return (
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<Loading />}>
            <Switch>
              {router.map(({
                key, loader, path, ...rest
              }) => (<Route exact component={lazy(loader)} key={path} path={path} {...rest} />))}
              <Route component={NotFound} path="*" />
            </Switch>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </ConfigProvider>

  );
}

export default ListApp;
