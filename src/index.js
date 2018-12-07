window.onload = () => {
    const ctx = document.querySelector('#chart').getContext('2d');

    const chartConfig = {
        type: 'line',
        data: {
            labels: ["Task 1", "Task 2", "Task 3", "Task 4", "Task 5", "Task 6", "Task 7", "Task 8", "Task 9", "Task 10"],
            datasets: [],
        },
        options: {
            title: {
                display: true,
                text: 'Comparison of results',
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    }

    const chart = new Chart(ctx, chartConfig);

    const colorSet = new Set();

    const generateRandomName = () => {
        const length = Math.floor(Math.random() * (8 - 4)) + 4;

        let name = '';

        for (let i = 0; i < length; i += 1) {
            name +=  String.fromCharCode(Math.floor(Math.random() * (122 - 97)) + 97);
        }
        
        return name;
    }

    const generateRandomTime = () => Math.floor(Math.random() * 200);

    const generateRandomColor = () => {
        let color = '#';
        
        for (let i = 0; i < 3; i += 1) {
            const colorComponent = Math.floor(Math.random() * 255);
            color += colorComponent.toString(16);
        }

        return color;
    }

    const addUserToChart = (config, setName) => {
        const name = setName || generateRandomName();
        
        const data = Array(10).fill(0).map(() => generateRandomTime());
    
        do {
            color = generateRandomColor();
        } while (colorSet.has(color));
        colorSet.add(color);

        const newUser = {
            label: name,
            data: data,
            backgroundColor: color,
            borderColor: color,
            borderWidth: 2,
            fill: false,
        }

        config.data.datasets.push(newUser);
        chart.update();
    }

    const removeUserFromChart = ({ data: { datasets } }, name) => {
        if (name) {
            const names = datasets.map(user => user.label);
            const index = names.indexOf(name);
            
            if (index === -1) {
                return;
            }

            datasets.splice(index, 1);
        } else {
            datasets.pop();
        }

        chart.update();
    }

    addUserToChart(chartConfig, 'mikhama');

    document.querySelector('#add').addEventListener('click', () => {
        const name = document.querySelector('#name').value || null;

        addUserToChart(chartConfig, name);
    });

    document.querySelector('#remove').addEventListener('click', () => {
        const name = document.querySelector('#name').value || null;
        
        removeUserFromChart(chartConfig, name);
    });
}
