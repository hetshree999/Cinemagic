const container = document.getElementById('input-cont');
        function addInput(){
            let input = document.createElement('input');
            input.placeholder = 'Type something';
            container.appendChild(input);
        }