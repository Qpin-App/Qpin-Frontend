import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LoginScreenNavigationProp } from '../../types/navigation';
import KakaoIcon from '../../assets/kakaoIcon.svg';
import NaverIcon from '../../assets/naverIcon.svg';
import GoogleIcon from '../../assets/googleIcon.svg';
import VisiblePasswordIcon from '../../assets/visiblePasswordIcon.svg';
import QpinLogo from '../../assets/qpinLogo.svg';

const { width, height } = Dimensions.get('window');

const ICONS = {
  logo: require('../../assets/icons/logo.png'),
  visiblePassword: require('../../assets/icons/visible_password.png'),
};

type SocialProvider = '카카오톡' | '네이버' | '구글';

const socialProviders: { name: SocialProvider; Icon: React.FC<any> }[] = [
  { name: '카카오톡', Icon: KakaoIcon },
  { name: '네이버', Icon: NaverIcon },
  { name: '구글', Icon: GoogleIcon },
];

interface LoginFormData {
  email: string;
  password: string;
  autoLogin: boolean;
}

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [autoLogin, setAutoLogin] = useState<boolean>(false);

  const handleLogin = (): void => {
    const loginData: LoginFormData = { email, password, autoLogin };
    navigation.navigate('Main');
    // 로그인 로직 구현
  };

  const handleSocialLogin = (provider: SocialProvider): void => {
    console.log(`${provider} 로그인 시도`);
    // 소셜 로그인 로직 구현
  };

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        
        {/* QPIN 로고 */}
        <QpinLogo style={styles.logoContainer} width={130} height={80} />

        {/* 입력 폼 */}
        <View style={styles.formContainer}>
            {/* 이메일 입력 */}
            <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="아이디(이메일)"
                placeholderTextColor="#B9B9B9"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            </View>

            {/* 비밀번호 입력 */}
            <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="비밀번호"
                placeholderTextColor="#B9B9B9"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!passwordVisible} 
            />
            <TouchableOpacity 
                style={styles.eyeIcon}
                onPress={() => setPasswordVisible(prev => !prev)}
            >
                <VisiblePasswordIcon width={20} height={20} />
            </TouchableOpacity>
            </View>

            {/* 자동 로그인 체크박스 */}
            <View style={styles.checkboxContainer}>
            <TouchableOpacity
                style={[styles.checkbox, autoLogin && styles.checkboxChecked]}
                onPress={() => setAutoLogin(!autoLogin)}
            >
                {autoLogin && <Text style={styles.checkmark}></Text>}
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>자동 로그인</Text>
            </View>

            {/* 로그인 버튼 */}
            <TouchableOpacity 
                style={[
                    styles.loginButton,
                    email.length > 0 && password.length > 0 && styles.loginButtonActive
                ]}
                onPress={handleLogin}>
                <Text style={styles.loginButtonText}>로그인</Text>
            </TouchableOpacity>

            {/* 링크들 */}
            <View style={styles.linksContainer}>
            <TouchableOpacity>
                <Text style={styles.linkText}>아이디 찾기</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.linkText}>비밀번호 찾기</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.linkText}>회원가입</Text>
            </TouchableOpacity>
            </View>

            {/* 간편 로그인 */}
            <View style={styles.socialLoginContainer}>
                <View style={styles.separatorContainer}>
                    <View style={styles.line} />
                    <Text style={styles.socialLoginTitle}>간편 로그인</Text>
                    <View style={styles.line} />
                </View>
               
                <View style={styles.socialButtonsContainer}>
                    {socialProviders.map(({ name, Icon }) => (
                        <TouchableOpacity key={name} onPress={() => handleSocialLogin(name)}>
                        <Icon width={40} height={40} />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: height * 0.1,
        marginBottom: height * 0.1,
        marginLeft: 20,
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 30,
    },
    inputContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        paddingVertical: 15,
        paddingRight: 40,
        fontSize: 14,
        color: '#333',
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        top: 15,
        padding: 5,
    },
    eyeIconText: {
        fontSize: 18,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 100,
        marginTop: 10,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#ddd',
        borderRadius: 3,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#38B7FF',
        borderColor: '#38B7FF',
    },
    checkmark: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    checkboxLabel: {
        fontSize: 14,
        color: '#666',
    },
    loginButton: {
        width: 200,
        height: 45,
        marginBottom: 30,
        borderRadius: 20,
        paddingBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(56, 183, 255, 0.5)',
        alignSelf: 'center',
    },
    loginButtonActive: {
        backgroundColor: "#38B7FF",
    },
    loginButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    linksContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    linkText: {
        fontSize: 14,
        color: '#999999',
    },
    socialLoginContainer: {
        alignItems: 'center',
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#DEDEDE',
    },
    socialLoginTitle: {
        fontSize: 14,
        color: '#B9B9B9',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 5,
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 40,
        marginTop: 20,
    },
});

export default LoginScreen;