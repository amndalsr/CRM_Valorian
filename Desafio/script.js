angular.module('app', [])
  .controller('CRMController', function($scope) {

    var vendasData = [
        {
          checked: false,
          nome: "Amanda",
          data: new Date ('10 11 2021'),
          valor: 23000,
          origem: "Facebook Ads",
          pais: "Brasil",
          estado: "PE",
          sexo: "Feminino",
          idade: "20-30 anos"
        },
        {
          checked: false,
          nome: "Laís",
          data: new Date ('10 11 2021'),
          valor: 34600,
          origem: "Facebook Ads",
          pais: "Brasil",
          estado: "RJ",
          sexo: "Feminino",
          idade: "20-30 anos"
        }
    ]

    $scope.dataSelecionada = null
    $scope.estadoSelecionado = null

    $scope.estados =  [
        {"nome": "Acre", "sigla": "AC"},
        {"nome": "Alagoas", "sigla": "AL"},
        {"nome": "Amapá", "sigla": "AP"},
        {"nome": "Amazonas", "sigla": "AM"},
        {"nome": "Bahia", "sigla": "BA"},
        {"nome": "Ceará", "sigla": "CE"},
        {"nome": "Distrito Federal", "sigla": "DF"},
        {"nome": "Espírito Santo", "sigla": "ES"},
        {"nome": "Goiás", "sigla": "GO"},
        {"nome": "Maranhão", "sigla": "MA"},
        {"nome": "Mato Grosso", "sigla": "MT"},
        {"nome": "Mato Grosso do Sul", "sigla": "MS"},
        {"nome": "Minas Gerais", "sigla": "MG"},
        {"nome": "Pará", "sigla": "PA"},
        {"nome": "Paraíba", "sigla": "PB"},
        {"nome": "Paraná", "sigla": "PR"},
        {"nome": "Pernambuco", "sigla": "PE"},
        {"nome": "Piauí", "sigla": "PI"},
        {"nome": "Rio de Janeiro", "sigla": "RJ"},
        {"nome": "Rio Grande do Norte", "sigla": "RN"},
        {"nome": "Rio Grande do Sul", "sigla": "RS"},
        {"nome": "Rondônia", "sigla": "RO"},
        {"nome": "Roraima", "sigla": "RR"},
        {"nome": "Santa Catarina", "sigla": "SC"},
        {"nome": "São Paulo", "sigla": "SP"},
        {"nome": "Sergipe", "sigla": "SE"},
        {"nome": "Tocantins", "sigla": "TO"}

    ]

    $scope.listaVendas = vendasData
    $scope.totalVendas = 0

    $scope.modal = {
        open: false,
        activeClass: "active"
    }

    let vendaDefault = {
        checked: false,
        nome: "", 
        data: "",
        valor: null,
        origem: null,
        pais: "",
        estado: null,
        sexo: "",
        idade: ""
    }

    $scope.vendaCadastrar = Object.assign({}, vendaDefault)

    $scope.adicionarVenda = function(){
        $scope.listaVendas.push(Object.assign({}, $scope.vendaCadastrar))
        $scope.modal.open = false
        Object.assign($scope.vendaCadastrar, vendaDefault)
        $scope.atualizarTotalVendas()

        console.log($scope.listaVendas)
    }

    $scope.atualizarTotalVendas = function(){
        $scope.totalVendas = $scope.listaVendas.reduce((n,{valor}) => n+valor, 0)
    }

    $scope.filterBy = function(){ 
        const vendasFiltradas = $scope.listaVendas.filter(venda => {
            let filter = false
            
            if ($scope.dataSelecionada) {
                let date = new Date(venda.data)
                filter = new Date($scope.dataSelecionada).getTime() === date.getTime()
            }
    
            if ($scope.estadoSelecionado) {
                filter = $scope.estadoSelecionado === venda.estado
            }
    
            
            return filter
        })
    
        $scope.totalVendas = vendasFiltradas.reduce((n,{valor}) => n+valor, 0)

        return vendasFiltradas
    }

    $scope.atualizarTotalVendas()
    console.log($scope.totalVendas)
});