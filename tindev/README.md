```Shell
yarn add react-navigation react-native-gesture-handler react-native-reanimated
```

Para android necessita adicionar na pasta android: React Native Gesture Handler

```Shell
yarn react-native run-android
```

Instalar AXIOS para acessar API:

```Shell
yarn add axios 
```

No android não é possível acessar o localhost!
Colocar o IP do computador na rede, uma opção.
ADB
```Shell
adb reverse tcp:3333 tcp:3333
```
Vai redirecionar as portas e utilizar o localhost!

LOGIN!

Para manter o usuário logado:

```Shell
yarn add @react-native-community/async-storage
```
acessar pasta ios e rodas 

```Shel
pod install
```
