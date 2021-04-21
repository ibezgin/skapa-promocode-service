export interface IResponse<T = any> {
    state: "success" | "error";
    error: any;
    value?: T;
}
