import "./App.css";
import Input from "./components/Input";
import Select from "./components/Select";
import Button from "./components/Button";
import { useState } from "react";
import { predict, train } from "./api/FlaskApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isXOR, setIsXOR] = useState(true);
  const [formData, setFormData] = useState({
    epochs: 1,
    hidden_size: "",
    activation: "",
    optimizer: "",
    loss: "",
  });
  const [trainRes, setTrainRes] = useState(null);
  const [X_pred, setXPred] = useState([]);
  const [predictions, setPredictions] = useState([]);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const trainModel = async (e) => {
    const {epochs, optimizer,loss,activation,hidden_size} = formData;
    if(!epochs || !optimizer || !loss || !activation || !hidden_size){
      toast.warn("please fill all the required fields 😵")
      return;
    }
    //remove previous results
    setTrainRes(null);
    //call train endpoint
    const res = await toast.promise(
      train({
        model_type: isXOR ? "xor" : "switch",
        opt: optimizer,
        loss_func: loss,
        activation: activation,
        hidden_size: hidden_size,
        epochs: epochs,
      }),
      {
        pending: "Request in progress",
        success: "Model trained 👌",
        error: "Opps!Something wrong happend 🤯",
      }
    );
    console.log(res.data);
    setTrainRes(res.data.data);
  };
  const predictInput = async () => {
    setPredictions([]);
    const res = await toast.promise(
      predict({
        model_type: isXOR ? "xor" : "switch",
        x_preds: X_pred,
      }),
      {
        pending: "Request in progress",
        success: "Result fetched successfully 👌",
        error: "Opps!Something wrong happend 🤯",
      }
    );
    console.log(res);
    setPredictions(res.data.data);
  };
  const addToInput = (val) => {
    setXPred([...X_pred, val]);
  };
  const clearPreds = () => {
    setXPred([]);
    setPredictions([]);
  };
  return (
    <div>
      <ToastContainer position="top-left" />
      <header>
        <div className="text-box">
          <h1 id="title">Tribar Software GmbH tensorflow task</h1>
          <p id="description">
            Training NN on XOR function &amp; toggle switch circuit
          </p>
        </div>
      </header>
      <div className="container">
        <div id="survey-form">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="labels">
              <label>Train Model on</label>
            </div>
            <div
              className="input-tab"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onChange={(e) => {
                setIsXOR(e.target.value === "xor");
                //clear some previous states
                setPredictions([]);
                setXPred([]);
                setTrainRes(null);
              }}
            >
              <input
                type="radio"
                name="model-type"
                value="xor"
                checked={isXOR}
              />
              XOR Function
              <input
                type="radio"
                name="model-type"
                value="switch"
                checked={!isXOR}
              />
              Toggle Switch circuit
            </div>
          </div>

          <Input
            name="epochs"
            label="epochs"
            placeholder="Enter number of epochs"
            type="number"
            onChange={onChange}
            value={formData.epochs}
          />

          <Select
            name="hidden_size"
            label="Hidden size"
            onChange={onChange}
            options={[8, 16, 32, 64, 128, 256].map((size) => ({
              label: size,
              value: size,
            }))}
          />

          <Select
            name="activation"
            onChange={onChange}
            label="Activation Function"
            options={[
              { label: "Relu", value: "relu" },
              { label: "Sigmoid", value: "sigmoid" },
            ]}
          />
          <Select
            name="loss"
            label="Loss Function"
            onChange={onChange}
            options={[
              { label: "Binary Crossentropy", value: "binary_crossentropy" },
              { label: "Mean Squared Error", value: "mean_squared_error" },
            ]}
          />
          <Select
            name="optimizer"
            label="Optimizer"
            onChange={onChange}
            options={[
              { label: "RMSprop", value: "RMSProp" },
              { label: "Adam", value: "Adam" },
              { label: "Stochastic Gradient Descent", value: "SGD" },
            ]}
          />

          <div className="btn">
            <button onClick={trainModel}>Train Model</button>
          </div>

          {trainRes && (
            <>
              <p id="description">Your model finished Training</p>
              <p id="description">&bull; Accuracy: {trainRes.acc} </p>
              <p id="description">&bull; Loss: {trainRes.loss}</p>
            </>
          )}
        </div>
      </div>

      <div className="text-box">
        <h1 id="title">Inference</h1>
        <p id="description">
          Start Predicting with your trained {isXOR ? "XOR" : "Switch"} model
        </p>
        <p id="description" style={{ fontSize: "15px" }}>
          ** Note: the last trained model is in use here
        </p>

        {isXOR ? (
          <div className="btns-container">
            {[
              [0, 0],
              [0, 1],
              [1, 0],
              [1, 1],
            ].map((txt) => (
              <Button title={txt} addToInput={addToInput} />
            ))}
          </div>
        ) : (
          <div className="btns-container">
            {[0, 1].map((txt) => (
              <Button title={txt} addToInput={addToInput} />
            ))}
          </div>
        )}

        <div className="labels">
          <label id="email-label" for="email">
            Inputs to predict "X_pred"
          </label>
        </div>
        <div className="input-tab">
          <div className="span-field" type="email" id="email" name="email">
            {X_pred.join("|")}
          </div>
        </div>

        <div className="labels">
          <label id="email-label" for="email">
            Predictions
          </label>
        </div>
        <div className="input-tab">
          <div className="span-field" type="email" id="email" name="email">
            {predictions.join(",")}
          </div>
        </div>

        <div className="btn">
          <button onClick={predictInput}>Predict</button>
          <button onClick={clearPreds} style={{ marginLeft: "1em" }}>
            clear
          </button>
        </div>
      </div>

      <footer>
        <p>&copy; 2023 Maeen Alikarrar</p>
      </footer>
    </div>
  );
}

export default App;
