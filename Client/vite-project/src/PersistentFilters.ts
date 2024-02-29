class PersistentFilters {
    public filters = {};
    public ApplyFilters = false;
    public setValue(name, Value) {
        this.filters[name] = Value;
    }
}

export default new PersistentFilters;