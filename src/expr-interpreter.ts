

interface BinaryOperatorNode {
    kind: 'BinaryOperator',
    left: ExpressionNode,
    right: ExpressionNode,
    operator: '+' | '-' | '*' | '/'
}

interface UnaryOperatorNode {
    kind: 'UnaryOperator',
    operator: '+' | '-',
    inner: ExpressionNode
}

interface NumberNode {
    kind: 'number',
    value: number
}

type ExpressionNode = BinaryOperatorNode | UnaryOperatorNode | NumberNode;

function evaluate(expression: ExpressionNode): number {
    switch (expression.kind) {
        case "number":
            return  expression.value
        case "BinaryOperator":
            const left = evaluate(expression.left);
            const right = evaluate(expression.right);
            switch (expression.operator) {
                case '+': return left + right;
                case '-': return left - right;
                case '*': return left * right;
                case '/': return left / right;
            }
            return 1;
        case "UnaryOperator":
            const tmp= evaluate(expression.inner);
            return expression.operator === "+" ? tmp: -tmp;
    }
}

const expr1: ExpressionNode = {
    kind: "BinaryOperator",
    operator: "*",
    left: {
        kind: "BinaryOperator",
        operator: "+",
        left: {
            kind: "number",
            value: 42
        },
        right: {
            kind: "number",
            value: 5
        }
    },
    right: {
        kind: "UnaryOperator",
        operator: "-",
        inner: {
            kind: "number",
            value: 12
        }
    }
};

const res = evaluate(expr1);
