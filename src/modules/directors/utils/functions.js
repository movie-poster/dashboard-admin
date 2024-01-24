import { v4 as uuidv4 } from 'uuid';
import { FIELD_FILE, NO_FINISH, QUESTION_CLOSED } from "../../../constant/constant";

//Función para enviar cuerpo (body) en srcipt HTML a la URL del documento
export const setBodyScriptHTML = (body) => {
    return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title></head><body>${body}</body></html>`
}

// Con respecto a la persona, lo que hace es mapear esos valores y los concatena en una variable
export const valueInputPeople = (listFoundPeople) => {
    let cadena = "";
    let list = listFoundPeople.data_peoples ? [...listFoundPeople.data_peoples]: [];
    list.splice(3);
    list.forEach(item => {
        if (item.value !== "N/A") {
            cadena += item.value + "; ";
        }
    })
return cadena;
}

export const validateExistingCodes = async (data, codesGlobal, codesActors, codesQuestions) => {
    const codes = [...codesGlobal, ...codesActors, ...codesQuestions];
    let content = data;

    const foundCodes = content.match(/({{)?(&amp;NC)?@\w+(#\w+)?(}})?/g);
    let errors = 0;

    if (foundCodes) {
        foundCodes.forEach((invalidCode) => {
            const position = content.indexOf(invalidCode);
            if (content.charCodeAt(position - 1) !== 32 && content.charCodeAt(position - 1) !== 62) {
                return;
            }
            if (content.includes(`<span style="color: rgb(224, 62, 45);">${invalidCode}</span>`)) {
                return;
            }
            if (!codes.includes(invalidCode)) {
                const pattern = new RegExp(invalidCode, 'gi');
                content = content.replace(pattern, `<span style="color: rgb(224, 62, 45);">${invalidCode}</span>`);
                errors++;
            }
        });

        return { content, errors };
    }
    return { content, errors: 1 };
}

export const extractActorsCodes = (typePeople) => {
    const codes = [];

    typePeople.clusters?.forEach(cluster => {
        cluster.parameterizations?.forEach(param => {
            codes.push("@" + param.code_parameterization);
        });
    });
    typePeople.categories?.forEach(category => {
        category.clusters?.forEach(cluster => {
            cluster.parameterizations?.forEach(param => {
                codes.push("@" + param.code_parameterization);
            });
        });
    });

    return codes;
}

export const extractGlobalCodes = (globalCodes = []) => {
    const codes = [];
    globalCodes.forEach(global => {
        codes.push("@" + global.code);
    });

    return codes;
}

export const extractQuestionCodes = (question) => {
    let codes = [];

    if (question.type === QUESTION_CLOSED) {
        question.answers?.forEach(answer => {
            if (answer.finish === NO_FINISH && answer.sequence_questions) {
                codes = [...codes, ...extractQuestionCodes(answer.sequence_questions?.questions_documents)];
            }
            else if (answer.code_questions) {
                codes.push("@" + answer.code_questions.code);
            }
        });
    }
    if (question.code_questions) {
        codes.push("@" + question.code_questions.code);
    }

    return codes;
}

export const addToCodeLabels = (codes = [], labels = []) => {
    const newCodes = [];
    labels.forEach(label => {
        codes.forEach(code => {
            newCodes.push(`${code}#${label.name}`);
        });
    });

    return newCodes;
}

export const addToCodeNameField = (codes = []) => {
    const newCodes = [];
    codes.forEach(code => {
        newCodes.push(`&amp;NC${code}`);
    });

    return newCodes;
}

export const addToCodeAll = (codes = []) => {
    const newCodes = [];
    codes.forEach(code => {
        newCodes.push(`{{${code}}}`);
    });

    return newCodes;
}

export const cutName = (field, maxSize) => {
    const tam = field.length;
    if (tam > maxSize) {
        return field?.substring(0, maxSize);
    }
    return field
}

export const filterFields = (typePeoples, favorites = []) => {
    let data = {};
    const listNormal = favorites.filter(favorite => !favorite.is_category);
    const listCategory = favorites.filter(favorite => favorite.is_category);

    typePeoples?.clusters?.forEach(cluster => {
        cluster?.parameterizations?.forEach(param => {
            const value = listNormal.findIndex(c => c.parameterization_id === param.id);
            if (param.type_fields_id !== FIELD_FILE) {
                data[param.name] = {
                    ...param,
                    state: value !== -1,
                    favorite_id: value !== -1 ? listNormal[value].id : 0,
                    cluster: cluster.name,
                    is_category: false,
                };
            }
        });
    });

    typePeoples?.categories?.forEach(category => {
        category?.clusters?.forEach(cluster => {
            cluster?.parameterizations?.forEach(param => {
                const value = listCategory.findIndex(c => c.parameterization_category_peoples_id === param.id);
                if (param.type_fields_id !== FIELD_FILE) {
                    data[`${param.name}-C`] = {
                        ...param,
                        state: value !== -1,
                        favorite_id: value !== -1 ? listCategory[value].id : 0,
                        cluster: `${category.name}-${cluster.name}`,
                        is_category: false,
                    };
                }
            });
        });
    });

    const lista = [];
    let claves = Object.keys(data);
    claves.forEach(element => {
        lista.push(data[element]);
    });

    return lista;
}

export const filterFieldsCase = (legalCase, favorites = []) => {
    let data = {};
    const listNormal = favorites.filter(favorite => !favorite.is_category);
    const listCategory = favorites.filter(favorite => favorite.is_category);

    legalCase?.clusters?.forEach(cluster => {
        cluster?.parameterizations?.forEach(param => {
            const value = listNormal.findIndex(c => c.parameterization_id === param.id);
            if (param.type_fields_id !== FIELD_FILE) {
                data[param.name] = {
                    ...param,
                    state: value !== -1,
                    favorite_id: value !== -1 ? listNormal[value].id : 0,
                    cluster: cluster.name,
                    is_category: false,
                };
            }
        });
    });

    legalCase?.categories?.forEach(category => {
        category?.clusters?.forEach(cluster => {
            cluster?.parameterizations?.forEach(param => {
                const value = listCategory.findIndex(c => c.parameterization_id === param.id);
                if (param.type_fields_id !== FIELD_FILE) {
                    data[`${param.name}-C`] = {
                        ...param,
                        state: value !== -1,
                        favorite_id: value !== -1 ? listCategory[value].id : 0,
                        cluster: `${category.name}-${cluster.name}`,
                        is_category: true,
                    };
                }
            });
        });
    });

    const lista = [];
    let claves = Object.keys(data);
    claves.forEach(element => {
        lista.push(data[element]);
    });

    return lista;
}

export const extractFieldsTable = (people = [], filtered = []) => {
    return people.map(p => {
        // const categoryData = p.data_category_peoples;

        // En las tablas se está dibujando solo la propiedad dataPeoples, por lo que solo en una propiedad
        // se debe especificar todos los campos filtrados como favoritos de la tabla de acuerdo con el tercero
        // Entonces si el item de los filtrados existe, se busca en el otro objeto que es data_category_peoples
        p.filtered = filtered?.map(item => {
            /* if (!!item.category_peoples_id) {
                const found = categoryData?.findIndex(param => item.id === param.parameterization_category_peoples_id);
                return found !== undefined && found !== -1 ? categoryData[found] : {
                    id: uuidv4(),
                    parameterization_category_peoples_id: item.id,
                    people_id: p.id,
                    value: "N/A",
                }
            } */

            const found = p.data_peoples?.findIndex(param => item.id === param.parameterization_id);
            return found !== undefined && found !== -1 ? p.data_peoples[found] : {
                id: uuidv4(),
                parameterization_id: item.id,
                people_id: p.id,
                value: "N/A",
            }
        });

        p.complete = p.data_peoples;

        return p;
    });
}

export const extractFieldsCaseTable = (createCase = [], filtered = []) => {
    return createCase.map(p => {
        p.filtered = filtered?.map(item => {
            const found = p.data_cases?.findIndex(param => item.id === param.parameterization_id);
            return found !== undefined && found !== -1 ? p.data_cases[found] : {
                id: uuidv4(),
                parameterization_id: item.id,
                create_case_id: p.id,
                value: "N/A",
            }
        });

        p.complete = p.data_cases;

        return p;
    });
}