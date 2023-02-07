export default function SchemaPlugin(schema) {
    const saveFunc = function (next) {
        this.updatedAt = new Date().toISOString();

        if (this.isNew) this.createdAt = new Date().toISOString();

        next();
    };

    const updateFunc = function (next) {
        this.set({ updatedAt: new Date().toISOString() });
        next();
    };

    schema.pre('save', saveFunc);
    schema.pre('update', updateFunc);
    schema.pre('findOneAndUpdate', updateFunc);
    schema.pre('findByIdAndUpdate', updateFunc);
}
