import { Filters, Icons } from './types';

export const icons: Icons = [
  {
    status: 'IN_PROGRESS',
    name: 'FaHandshake',
    backgroundColor: '#3B82F6',
    color: '#FFFFFF',
    title: 'Trade Started',
    mainActionButtonLabel: 'Go to Trade',
  },
  {
    status: 'COMPLETED',
    name: 'FaCircleCheck',
    backgroundColor: '#10B981',
    color: '#FFFFFF',
    title: 'Trade Completed Successfully',
    mainActionButtonLabel: 'Go to Trade Details',
  },
  {
    status: 'CANCELLED',
    name: 'FaCircleXmark',
    backgroundColor: '#F59E0B',
    color: '#FFFFFF',
    title: 'Trade Cancelled',
    mainActionButtonLabel: 'Go to Trade Details',
  },
  {
    status: 'DISPUTED',
    name: 'FaTriangleExclamation',
    backgroundColor: '#EF4444',
    color: '#FFFFFF',
    title: 'Trade Dispute Opened',
    mainActionButtonLabel: 'Go to Dispute Details',
  },
  {
    status: 'EXPIRED',
    name: 'FaClock',
    backgroundColor: '#6B7280',
    color: '#FFFFFF',
    title: 'Trade Expired',
    mainActionButtonLabel: 'Go to Trade Details',
  },
  {
    status: 'FAILED',
    name: 'FaXmark',
    backgroundColor: '#EF4444',
    color: '#FFFFFF',
    title: 'Trade Failed',
    mainActionButtonLabel: 'Go to Trade Details',
  },
];

export const filters: Filters = [
  {
    label: 'As Vendor',
    filter: 'vendor',
  },
  {
    label: 'As Trader',
    filter: 'trader',
  },
];
