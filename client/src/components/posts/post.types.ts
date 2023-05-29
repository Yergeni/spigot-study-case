export interface IPost {
	id: string;
	title: string;
	summary: string;
	description: string;
	image: string;
	featured: boolean;
	createdAt: string | Date;
	updatedAt: string | Date;
  author: {
    id: string,
    username: string,
    role: string
  }
}

export type PostFormData = {
	title: string;
	summary: string;
	image: FileList | null;
};
