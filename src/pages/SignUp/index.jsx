import { useState } from "react";
import Joi from "joi";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import passwordComplexity from "joi-password-complexity";
import TextField from "../../components/Inputs/TextField";
import Select from "../../components/Inputs/Select";
import Radio from "../../components/Inputs/Radio";
import Checkbox from "../../components/Inputs/Checkbox";
import Button from "../../components/Button";
import logo from "../../images/black_logo.svg";
import styles from "./styles.module.scss";
import axiosInstance from "../../redux/axiosInstance";

const months = [
  { name: "Janeiro", value: "01" },
  { name: "Fevereiro", value: "02" },
  { name: "Marçp", value: "03" },
  { name: "Abril", value: "04" },
  { name: "Maio", value: "05" },
  { name: "Junho", value: "06" },
  { name: "Julho", value: "07" },
  { name: "Agosto", value: "08" },
  { name: "Setembro", value: "09" },
  { name: "Outubro", value: "10" },
  { name: "Novembro", value: "11" },
  { name: "Dezembro", value: "12" },
];

const genders = ["Masculino", "Femenino", "Não-Binario"];

const SignUp = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    month: "",
    year: "",
    date: "",
    gender: "",
  });
  const [errors, setErrors] = useState({});
  const [isFetching, setIsFetching] = useState(false);

  const history = useHistory();

  const handleInputState = (name, value) => {
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleErrorState = (name, value) => {
    value === ""
      ? delete errors[name]
      : setErrors(() => ({ ...errors, [name]: value }));
  };

  const schema = {
    email: Joi.string().email({ tlds: false }).required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    name: Joi.string().min(5).max(10).required().label("Name"),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      try {
        setIsFetching(true);
        await axiosInstance.post("/users", data);
        setIsFetching(false);
        toast.success("Conta criada com sucesso!");
        history.push("/login");
      } catch (error) {
        setIsFetching(false);
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status < 500
        ) {
          toast.error(error.response.data);
        } else {
          console.log(error);
          toast.error("Algo de Errado!");
        }
      }
    } else {
      console.log("Preencha todos Valores");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" style={{width:200}} />
      </div>
      <h1 className={styles.heading}>Cadastro Livre e Ouve todas músicas.</h1>
      <p className={styles.or_container}>or</p>
      <form onSubmit={handleSubmit} className={styles.form_container}>
        <h2 className={styles.form_heading}>Cadastre-se com o seu Email</h2>
        <div className={styles.input_container}>
          <TextField
            label="Qual ê o seu email?"
            placeholder="Informe o seu email"
            name="email"
            handleInputState={handleInputState}
            schema={schema.email}
            handleErrorState={handleErrorState}
            value={data.email}
            error={errors.email}
            required={true}
          />
        </div>
        <div className={styles.input_container}>
          <TextField
            label="Password"
            placeholder="informe a password"
            name="password"
            handleInputState={handleInputState}
            schema={schema.password}
            handleErrorState={handleErrorState}
            value={data.password}
            error={errors.password}
            type="password"
            required={true}
          />
        </div>
        <div className={styles.input_container}>
          <TextField
            label="Como quer ser chamado"
            placeholder="Informe o nome de usuário"
            name="name"
            handleInputState={handleInputState}
            schema={schema.name}
            handleErrorState={handleErrorState}
            value={data.name}
            error={errors.name}
            required={true}
          />
        </div>
        <div className={styles.date_of_birth_container}>
          <p>Qual é a sua data de nascimento?</p>
          <div className={styles.date_of_birth}>
            <div className={styles.month}>
              <Select
                name="month"
                handleInputState={handleInputState}
                label="Mês"
                placeholder="Meses"
                options={months}
                value={data.month}
                required={true}
              />
            </div>
            <div className={styles.date}>
              <TextField
                label="Dia"
                placeholder="DD"
                name="date"
                value={data.date}
                handleInputState={handleInputState}
                required={true}
              />
            </div>
            <div className={styles.year}>
              <TextField
                label="Ano"
                placeholder="YYYY"
                name="year"
                value={data.year}
                handleInputState={handleInputState}
                required={true}
              />
            </div>
          </div>
        </div>
        <div className={styles.input_container}>
          <Radio
            label="Qual é o seu gênero?"
            name="gender"
            handleInputState={handleInputState}
            options={genders}
            required={true}
          />
        </div>
        <div className={styles.checkbox_container}>
          <Checkbox required={false} label="Termos de uso" />
        </div>
        <p className={styles.terms_condition}>
          Clicando em registrar Aceita todos termos de uso{" "}
          <a href="/#">Termos e condiçōes de termo de uso.</a>
        </p>
        <p className={styles.terms_condition}>
          Para saber mais sobre como o Smooth coleta, usa, compartilha e protege
          seus dados pessoais, consulte{" "}
          <a href="/#">Política de privacidade do Smooth.</a>
        </p>
        <div className={styles.submit_btn_wrapper}>
          <Button label="Registrar" type="submit" isFetching={isFetching} />
        </div>
        <p className={styles.terms_condition} style={{ fontSize: "1.6rem" }}>
          Já tem uma conta? <Link to="/login"> Login.</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
