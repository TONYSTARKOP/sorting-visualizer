let array = [];

function generateArray() {
    const input = document.getElementById('arrayInput').value;
    array = input.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
    drawArray();
}

function drawArray(highlightIndices = []) {
    const container = document.getElementById('arrayContainer');
    container.innerHTML = '';
    array.forEach((value, index) => {
        const element = document.createElement('div');
        element.className = 'element';
        element.innerText = value; // Display the value inside the element
        if (highlightIndices.includes(index)) {
            element.classList.add('highlight'); // Highlight the sorted elements
        }
        container.appendChild(element);
    });
}

async function bubbleSort(delay) {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]]; // Swap
                drawArray([j, j + 1]);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    drawArray(); // Final draw
}

async function selectionSort(delay) {
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        [array[i], array[minIndex]] = [array[minIndex], array[i]]; // Swap
        drawArray([i, minIndex]);
        await new Promise(resolve => setTimeout(resolve, delay));
    }
    drawArray(); // Final draw
}

async function insertionSort(delay) {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            drawArray([j + 1, j]);
            await new Promise(resolve => setTimeout(resolve, delay));
            j--;
        }
        array[j + 1] = key;
        drawArray([j + 1]);
        await new Promise(resolve => setTimeout(resolve, delay));
    }
    drawArray(); // Final draw
}

async function mergeSort(delay) {
    await mergeSortHelper(array, 0, array.length - 1, delay);
    drawArray(); // Final draw
}

async function mergeSortHelper(arr, left, right, delay) {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);
        await mergeSortHelper(arr, left, mid, delay);
        await mergeSortHelper(arr, mid + 1, right, delay);
        await merge(arr, left, mid, right, delay);
    }
}

async function merge(arr, left, mid, right, delay) {
    const leftArray = arr.slice(left, mid + 1);
    const rightArray = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArray.length && j < rightArray.length) {
        if (leftArray[i] <= rightArray[j]) {
            arr[k++] = leftArray[i++];
        } else {
            arr[k++] = rightArray[j++];
        }
        drawArray([k - 1]);
        await new Promise(resolve => setTimeout(resolve, delay));
    }

    while (i < leftArray.length) {
        arr[k++] = leftArray[i++];
        drawArray([k - 1]);
        await new Promise(resolve => setTimeout(resolve, delay));
    }

    while (j < rightArray.length) {
        arr[k++] = rightArray[j++];
        drawArray([k - 1]);
        await new Promise(resolve => setTimeout(resolve, delay));
    }
}

async function quickSort(delay) {
    await quickSortHelper(array, 0, array.length - 1, delay);
    drawArray(); // Final draw
}

async function quickSortHelper(arr, low, high, delay) {
    if (low < high) {
        const pi = await partition(arr, low, high, delay);
        await quickSortHelper(arr, low, pi - 1, delay);
        await quickSortHelper(arr, pi + 1, high, delay);
    }
}

async function partition(arr, low, high, delay) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap
            drawArray([i, j]);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // Swap pivot
    drawArray([i + 1, high]);
    await new Promise(resolve => setTimeout(resolve, delay));
    return i + 1;
}

async function heapSort(delay) {
    const n = array.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(array, n, i, delay);
    }
    for (let i = n - 1; i > 0; i--) {
        [array[0], array[i]] = [array[i], array[0]]; // Swap
        drawArray([0, i]);
        await new Promise(resolve => setTimeout(resolve, delay));
        await heapify(array, i, 0, delay);
    }
    drawArray(); // Final draw
}

async function heapify(arr, n, i, delay) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]]; // Swap
        drawArray([i, largest]);
        await new Promise(resolve => setTimeout(resolve, delay));
        await heapify(arr, n, largest, delay);
    }
}

async function shellSort(delay) {
    const n = array.length;
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < n; i++) {
            let temp = array[i];
            let j;
            for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
                array[j] = array[j - gap];
                drawArray([j, j - gap]);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
            array[j] = temp;
            drawArray([j]);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    drawArray(); // Final draw
}

async function countingSort(delay) {
    const max = Math.max(...array);
    const count = new Array(max + 1).fill(0);
    const output = new Array(array.length);

    for (let i = 0; i < array.length; i++) {
        count[array[i]]++;
    }

    for (let i = 1; i <= max; i++) {
        count[i] += count[i - 1];
    }

    for (let i = array.length - 1; i >= 0; i--) {
        output[count[array[i]] - 1] = array[i];
        count[array[i]]--;
        drawArray([i]);
        await new Promise(resolve => setTimeout(resolve, delay));
    }

    for (let i = 0; i < array.length; i++) {
        array[i] = output[i];
    }
    drawArray(); // Final draw
}

async function startSorting() {
    generateArray(); // Generate array from input
    const algorithm = document.getElementById('sortAlgorithm').value;
    const speed = document.getElementById('speed').value;

    displayAlgorithmCode(algorithm); // Show code immediately
    displayAlgorithmExplanation(algorithm); // Show explanation

    if (algorithm === 'bubble') {
        await bubbleSort(speed);
    } else if (algorithm === 'selection') {
        await selectionSort(speed);
    } else if (algorithm === 'insertion') {
        await insertionSort(speed);
    } else if (algorithm === 'merge') {
        await mergeSort(speed);
    } else if (algorithm === 'quick') {
        await quickSort(speed);
    } else if (algorithm === 'heap') {
        await heapSort(speed);
    } else if (algorithm === 'shell') {
        await shellSort(speed);
    } else if (algorithm === 'counting') {
        await countingSort(speed);
    } else if (algorithm === 'radix') {
        await radixSort(speed);
    } else if (algorithm === 'bucket') {
        await bucketSort(speed);
    } else if (algorithm === 'comb') {
        await combSort(speed);
    }
}

function displayAlgorithmCode(algorithm) {
    const codeContainer = document.getElementById('codeContainer');
    let code = '';
    switch (algorithm) {
        case 'bubble':
            code = `void bubbleSort(int arr[], int n) {\n    for (int i = 0; i < n-1; i++) {\n        for (int j = 0; j < n-i-1; j++) {\n            if (arr[j] > arr[j+1]) {\n                swap(&arr[j], &arr[j+1]);\n            }\n        }\n    }\n}`;
            break;
        case 'selection':
            code = `void selectionSort(int arr[], int n) {\n    for (int i = 0; i < n-1; i++) {\n        int min_idx = i;\n        for (int j = i+1; j < n; j++) {\n            if (arr[j] < arr[min_idx]) {\n                min_idx = j;\n            }\n        }\n        swap(&arr[min_idx], &arr[i]);\n    }\n}`;
            break;
        case 'insertion':
            code = `void insertionSort(int arr[], int n) {\n    for (int i = 1; i < n; i++) {\n        int key = arr[i];\n        int j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j--;\n        }\n        arr[j + 1] = key;\n    }\n}`;
            break;
        case 'merge':
            code = `void mergeSort(int arr[], int left, int right) {\n    if (left < right) {\n        int mid = (left + right) / 2;\n        mergeSort(arr, left, mid);\n        mergeSort(arr, mid + 1, right);\n        merge(arr, left, mid, right);\n    }\n}`;
            break;
        case 'quick':
            code = `void quickSort(int arr[], int low, int high) {\n    if (low < high) {\n        int pi = partition(arr, low, high);\n        quickSort(arr, low, pi - 1);\n        quickSort(arr, pi + 1, high);\n    }\n}`;
            break;
        case 'heap':
            code = `void heapSort(int arr[], int n) {\n    for (int i = Math.floor(n / 2) - 1; i >= 0; i--) {\n        heapify(arr, n, i);\n    }\n    for (int i = n - 1; i > 0; i--) {\n        swap(arr[0], arr[i]);\n        heapify(arr, i, 0);\n    }\n}`;
            break;
        case 'shell':
            code = `void shellSort(int arr[], int n) {\n    for (int gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {\n        for (int i = gap; i < n; i++) {\n            int temp = arr[i];\n            int j;\n            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {\n                arr[j] = arr[j - gap];\n            }\n            arr[j] = temp;\n        }\n    }\n}`;
            break;
        case 'counting':
            code = `void countingSort(int arr[], int n) {\n    int max = Math.max(...arr);\n    int count[max + 1] = {0};\n    int output[n];\n    for (int i = 0; i < n; i++) {\n        count[arr[i]]++;\n    }\n    for (int i = 1; i <= max; i++) {\n        count[i] += count[i - 1];\n    }\n    for (int i = n - 1; i >= 0; i--) {\n        output[count[arr[i]] - 1] = arr[i];\n        count[arr[i]]--;\n    }\n    for (int i = 0; i < n; i++) {\n        arr[i] = output[i];\n    }\n}`;
            break;
        case 'radix':
            code = `void radixSort(int arr[], int n) {\n    int max = getMax(arr, n);\n    for (int exp = 1; max / exp > 0; exp *= 10) {\n        countingSort(arr, n, exp);\n    }\n}`;
            break;
        case 'bucket':
            code = `void bucketSort(float arr[], int n) {\n    // Create n empty buckets\n    vector<float> b[n];\n    for (int i = 0; i < n; i++) {\n        int bi = n * arr[i]; // Index in bucket\n        b[bi].push_back(arr[i]);\n    }\n    // Sort individual buckets\n    for (int i = 0; i < n; i++) {\n        sort(b[i].begin(), b[i].end());\n    }\n    // Concatenate all buckets\n    int index = 0;\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < b[i].size(); j++) {\n            arr[index++] = b[i][j];\n        }\n    }\n}`;
            break;
        case 'comb':
            code = `void combSort(int arr[], int n) {\n    int gap = n;\n    bool swapped = true;\n    while (gap != 1 || swapped) {\n        gap = (gap * 10) / 13;\n        if (gap < 1) gap = 1;\n        swapped = false;\n        for (int i = 0; i < n - gap; i++) {\n            if (arr[i] > arr[i + gap]) {\n                swap(arr[i], arr[i + gap]);\n                swapped = true;\n            }\n        }\n    }\n}`;
            break;
    }
    codeContainer.innerText = code;
}

function displayAlgorithmExplanation(algorithm) {
    const explanationContainer = document.getElementById('explanationContainer');
    let explanation = '';
    switch (algorithm) {
        case 'bubble':
            explanation = "Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. This process is repeated until the list is sorted.";
            break;
        case 'selection':
            explanation = "Selection Sort divides the input list into two parts: a sorted and an unsorted part. It repeatedly selects the smallest (or largest) element from the unsorted part and moves it to the sorted part.";
            break;
        case 'insertion':
            explanation = "Insertion Sort builds the final sorted array one item at a time. It takes each element from the input and finds the appropriate position in the sorted part of the array.";
            break;
        case 'merge':
            explanation = "Merge Sort divides the array into halves, sorts them, and then merges them back together. It is a divide-and-conquer algorithm.";
            break;
        case 'quick':
            explanation = "Quick Sort selects a 'pivot' element and partitions the other elements into two sub-arrays according to whether they are less than or greater than the pivot.";
            break;
        case 'heap':
            explanation = "Heap Sort converts the array into a heap structure, then repeatedly extracts the maximum element from the heap and rebuilds the heap until the array is sorted.";
            break;
        case 'shell':
            explanation = "Shell Sort is an optimization of Insertion Sort that allows the exchange of items that are far apart. It starts with a large gap and reduces it over time.";
            break;
        case 'counting':
            explanation = "Counting Sort counts the occurrences of each unique element in the array and uses this information to place each element in its correct position.";
            break;
        case 'radix':
            explanation = "Radix Sort processes the digits of the numbers from least significant to most significant, using Counting Sort as a subroutine.";
            break;
        case 'bucket':
            explanation = "Bucket Sort distributes the elements into a number of buckets, sorts each bucket individually, and then concatenates the results.";
            break;
        case 'comb':
            explanation = "Comb Sort is an improvement over Bubble Sort that eliminates small values near the end of the list, using a gap sequence to compare elements.";
            break;
    }
    explanationContainer.innerText = explanation;
}
