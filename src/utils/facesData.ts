
export interface FaceModel {
  id: string;
  name: string;
  thumbnailUrl: string;
  createdAt: string;
  status: 'processing' | 'completed' | 'failed';
}

export const faceModels: FaceModel[] = [
  {
    id: '1',
    name: 'Model #1',
    thumbnailUrl: '/placeholder.svg',
    createdAt: '2023-09-15T14:30:00Z',
    status: 'completed'
  },
  {
    id: '2',
    name: 'Model #2',
    thumbnailUrl: '/placeholder.svg',
    createdAt: '2023-09-15T13:45:00Z',
    status: 'completed'
  },
  {
    id: '3',
    name: 'Model #3',
    thumbnailUrl: '/placeholder.svg',
    createdAt: '2023-09-15T12:20:00Z',
    status: 'completed'
  },
  {
    id: '4',
    name: 'Model #4',
    thumbnailUrl: '/placeholder.svg',
    createdAt: '2023-09-14T09:10:00Z',
    status: 'processing'
  }
];
