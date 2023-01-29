

const addRecipe = async(req, res) => {
    const {name, instruction, indegredients} = req.body;
    
    res.json({msg: name,instruction,indegredients})
}

const updateRecipe = async(req, res) => {
    const {name, instruction, indegredients} = req.body;

    res.json({msg: name, instruction, indegredients})
}

export {addRecipe, updateRecipe}