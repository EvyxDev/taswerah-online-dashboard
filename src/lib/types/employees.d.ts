declare type CreateBranchManagerResponse = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    branch_id: string;
    createdAt: string;
    updatedAt: string;
}


declare type CreateBranchManagerBody = {
    name: string;
    email: string;
    phone: string;
    password: string;
    branch_id: string;

}