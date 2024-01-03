import {
	faAddressCard,
	faHouseChimney,
	faList,
	faWarehouse,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Category, ManageProducts, Store, UserAccount } from './Layouts'
import { faProductHunt } from '@fortawesome/free-brands-svg-icons'
import Dashboard from './Layouts/Dashboard'
import Test from './Layouts/Test'

const MenuMap = [
	{
		name: 'Dashboard',
		element: <Dashboard icon={<FontAwesomeIcon icon={faHouseChimney} />} />,
		icon: <FontAwesomeIcon icon={faHouseChimney} />,
	},
	{
		name: 'Danh mục',
		element: <Category icon={<FontAwesomeIcon icon={faList} />} />,
		icon: <FontAwesomeIcon icon={faList} />,
	},
	{
		name: 'Tài khoản người dùng',
		element: <UserAccount icon={<FontAwesomeIcon icon={faAddressCard} />} />,
		icon: <FontAwesomeIcon icon={faAddressCard} />,
	},
	{
		name: 'Quản lí sản phẩm',
		element: <ManageProducts icon={<FontAwesomeIcon icon={faProductHunt} />} />,
		icon: <FontAwesomeIcon icon={faProductHunt} />,
	},
	{
		name: 'Kho hàng',
		element: <Store icon={<FontAwesomeIcon icon={faWarehouse} />} />,
		icon: <FontAwesomeIcon icon={faWarehouse} />,
	},
	{
		name: 'Test',
		element: <Test icon={<FontAwesomeIcon icon={faWarehouse} />} />,
		icon: <FontAwesomeIcon icon={faWarehouse} />,
	},
]

export default MenuMap
