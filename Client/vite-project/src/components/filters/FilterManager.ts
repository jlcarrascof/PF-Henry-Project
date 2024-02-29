namespace FilterManager {
    export type Filters = {
        minPrice: string,
        maxPrice: string,
        address: string,
        desiredCheckInDate: string,
        desiredCheckOutDate: string,
        minScore: string,
        services: string
    }
}

const FilterManager = new class FilterManager {
    private Filters: FilterManager.Filters = {
        minPrice: "",
        maxPrice: "",
        address: "",
        desiredCheckInDate: "",
        desiredCheckOutDate: "",
        minScore: "",
        services: "",
    };
    private Apply = false;

    public ApplyFilter(): boolean {
        return this.Apply;
    }
    public SetApplyFilter(Apply: boolean = true): void {
        this.Apply = Apply;
    }
    public GetFilterObject(): FilterManager.Filters {
        return this.Filters;
    }
    public SetFilter<Name extends keyof FilterManager.Filters>(Name: Name, Value: FilterManager.Filters[Name]): void ;
    public SetFilter(Name: string, Value: any): void;
    public SetFilter(Name: string, Value: any): void {
        this.Filters[Name] = Value;
    }
}

export default FilterManager;