import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Dimensions, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { LoginScreenNavigationProp } from '../../types/navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

type SocialProvider = '카카오톡' | '네이버' | '구글';

interface LoginFormData {
  email: string;
  password: string;
  autoLogin: boolean;
}

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [autoLogin, setAutoLogin] = useState<boolean>(false);

  const handleLogin = (): void => {
    const loginData: LoginFormData = { email, password, autoLogin };
    console.log('로그인 시도:', loginData);
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
        <Image
            source={require("../../assets/icons/logo.png")}
            style={styles.logoContainer}
        />


        {/* 입력 폼 */}
        <View style={styles.formContainer}>
            {/* 이메일 입력 */}
            <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="아이디(이메일)"
                placeholderTextColor="#999"
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
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.eyeIcon}>
                <Text style={styles.eyeIconText}>👁</Text>
            </TouchableOpacity>
            </View>

            {/* 자동 로그인 체크박스 */}
            <View style={styles.checkboxContainer}>
            <TouchableOpacity
                style={[styles.checkbox, autoLogin && styles.checkboxChecked]}
                onPress={() => setAutoLogin(!autoLogin)}
            >
                {autoLogin && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>자동 로그인</Text>
            </View>

            {/* 로그인 버튼 */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
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
            <Text style={styles.socialLoginTitle}>간편 로그인</Text>
            
            <View style={styles.socialButtonsContainer}>
                {/* 카카오톡 */}
                <TouchableOpacity
                onPress={() => handleSocialLogin('카카오톡')}
                >
                    <Image
                        source={require("../../assets/icons/kakao_logo.png")}
                        style={styles.socialButton}
                    />
                </TouchableOpacity>

                {/* 네이버 */}
                <TouchableOpacity
                onPress={() => handleSocialLogin('네이버')}
                >
                    <Image
                        source={require("../../assets/icons/naver_logo.png")}
                        style={styles.socialButton}
                    />
                </TouchableOpacity>

                {/* 구글 */}
                <TouchableOpacity
                onPress={() => handleSocialLogin('구글')}
                >
                    <Image
                        source={require("../../assets/icons/google_logo.png")}
                        style={styles.socialButton}
                    />
                </TouchableOpacity>
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
        width: 130,
        height: 60,
        marginTop: height * 0.1,
        marginBottom: height * 0.08,
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
        fontSize: 16,
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
        marginBottom: 30,
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
        backgroundColor: '#87CEEB',
        borderColor: '#87CEEB',
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
        backgroundColor: '#38B7FF',
        alignSelf: 'center',
    },
    loginButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    linksContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 50,
    },
    linkText: {
        fontSize: 14,
        color: '#666',
    },
    socialLoginContainer: {
        alignItems: 'center',
    },
    socialLoginTitle: {
        fontSize: 14,
        color: '#999',
        marginBottom: 20,
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 40,
    },
    socialButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    socialIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    socialIcon: {
        fontSize: 20,
    },
    socialIconNaver: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
    },
});

export default LoginScreen;