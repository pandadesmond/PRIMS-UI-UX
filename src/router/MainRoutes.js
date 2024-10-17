import locationRoutes from './routes/locationRoutes';
import purchaseOrderRoutes from './routes/purchaseOrderRoutes';
import itemMasterRoutes from './routes/itemMasterRoutes';

const routes = [
  ...locationRoutes,
  ...purchaseOrderRoutes,
  ...itemMasterRoutes
];

export default routes;
