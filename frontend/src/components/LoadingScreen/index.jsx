import { Spin } from 'antd';
import './LoadingScreen.scss';

export default function index() {
  return (
    <div className="loading-screen">
      <Spin color="primary" />
    </div>
  );
}
