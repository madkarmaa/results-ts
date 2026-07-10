import angular from 'conventional-changelog-angular';

export default async () => {
    const preset = await angular();
    const transform = preset.writer.transform;

    preset.writer.transform = (commit, context) => {
        if (commit.type === 'chore') {
            if (commit.scope || commit.subject !== 'update deps') {
                return undefined;
            }

            return {
                ...transform({ ...commit, type: 'feat' }, context),
                type: 'Dependency Updates'
            };
        }

        if (commit.type === 'docs') {
            return {
                ...transform({ ...commit, type: 'feat' }, context),
                type: 'Documentation'
            };
        }

        return transform(commit, context);
    };

    return preset;
};
