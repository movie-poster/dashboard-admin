

export const textActorCodes = (typePeople, actor) => {
    let text = `\n\n ■ Tipo de actor: ${typePeople.name}\n\n`;
    text += `  » Etiquetas\n`;
    actor.label_actors?.forEach(label=>{
        text += `   - ${label.name}\n`;
    });

    text += `\n\n  » Grupos de datos\n`;
    typePeople.clusters?.forEach((cluster, i) => {
        text += `\n   -> Grupo #${i + 1}: ${cluster.name}\n`;
        cluster.parameterizations?.forEach(field => {
            text += `     - @${field.code_parameterization}: ${field.name}\n`;
        });
    });

    if (typePeople.categories) {
        text += `\n  » Categorías\n\n`;
        typePeople.categories?.forEach((category, i) => {
            text += `   > Categoría #${i + 1}: ${category.name}\n`;
            category.clusters?.forEach((cluster, k) => {
                text += `\n    -> Grupo #${k + 1}: ${cluster.name}\n`;
                cluster.parameterizations?.forEach(field => {
                    text += `      - @${field.code_parameterization}: ${field.name}\n`;
                });
            });
        });
    }

    return text;
}

export const textGlobalCodes = (globalCodes = []) => {
    let text = "\nCódigos globales\n";
    globalCodes.forEach(global => {
        text += `    - @${global.code}: ${global.name}\n`;
    });

    return text;
}